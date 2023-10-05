import { Injectable, HttpStatus, HttpException, Res } from '@nestjs/common';
import { Response } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserResponse } from './auth.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { validatePassword } from './auth.validation';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      path: '/', // Specify the path where the cookie is accessible
      sameSite: 'strict', // Set the SameSite attribute for added security
      secure: true, // Set secure to true when using HTTPS
    });

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: '/', // Specify the path where the cookie is accessible
      sameSite: 'strict', // Set the SameSite attribute for added security
      secure: true, // Set secure to true when using HTTPS
    });
  }

  async signup(
    email: string,
    name: string,
    password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      // Check if a user with the same email already exists
      const existingUser = await this.userModel.findOne({ email }).exec();

      if (existingUser) {
        // User with the same email already exists, throw an error with status 400 (Bad Request)
        throw new Error('Email is already in use!');
      }

      // Password validation checks
      if (!validatePassword(password)) {
        throw new Error(
          'Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character.',
        );
      }

      // Generate a salt (10 is a good number) and hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user with the hashed password and save it to the database
      const user = new this.userModel({
        email,
        name,
        password: hashedPassword,
      });
      await user.save();

      const accessToken = this.jwtService.generateAccessToken({
        userId: user._id,
      });

      const refreshToken = this.jwtService.generateRefreshToken({
        userId: user._id,
      });

      // Set access and refresh tokens as cookies
      this.setAuthCookies(response, accessToken, refreshToken);

      const resp: UserResponse = {
        email: user.email,
        name: user.name,
        id: user._id,
        accessToken,
        refreshToken,
      };

      // Return the user data
      response.json(resp);
    } catch (error: any) {
      // Handle errors and rethrow with a custom status code
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async signin(
    email: string,
    password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      // Find a user by email
      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        // User not found, throw an error with status 404 (Not Found)
        throw new Error('User not found');
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        // Passwords do not match, throw an error with status 401 (Unauthorized)
        throw new Error('Invalid password');
      }

      const accessToken = this.jwtService.generateAccessToken({
        userId: user._id,
      });

      const refreshToken = this.jwtService.generateRefreshToken({
        userId: user._id,
      });

      // Set access and refresh tokens as cookies
      this.setAuthCookies(response, accessToken, refreshToken);

      const resp: UserResponse = {
        email: user.email,
        name: user.name,
        id: user._id,
        accessToken,
        refreshToken,
      };
      // Return the user data
      response.json(resp);
    } catch (error: any) {
      // Handle errors and rethrow with custom status codes
      if (error.message === 'User not found') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else if (error.message === 'Invalid password') {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async userLoaded(refreshToken: string, response: Response) {
    try {
      // Verify the refresh token and obtain the user ID
      const { userId } = this.jwtService.verifyRefreshToken(refreshToken);

      // Generate a new access & refresh token
      const newAccessToken = this.jwtService.generateAccessToken({ userId });
      const newRefreshToken = this.jwtService.generateRefreshToken({ userId });

      this.setAuthCookies(response, newAccessToken, newRefreshToken);

      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return { ...user, accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
      console.log(error)
      // Optionally, you can clear the cookies here if needed
      response.clearCookie('accessToken', {
        path: '/',
        sameSite: 'strict',
        secure: true,
      });
      response.clearCookie('refreshToken', {
        path: '/',
        sameSite: 'strict',
        secure: true,
      });

      // Throw an HTTP exception to indicate token refresh failure
      throw new HttpException(
        'Token refresh failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  logout(@Res({ passthrough: true }) response: Response): void {
    // Clear the access and refresh tokens from cookies
    response.clearCookie('accessToken', {
      path: '/',
      sameSite: 'strict',
      secure: true,
    });
    response.clearCookie('refreshToken', {
      path: '/',
      sameSite: 'strict',
      secure: true,
    });
  }
}

import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint for user sign-in
  // POST: /auth/signin
  @Post('signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    // Call the authentication service's signin method to handle user sign-in
    const user = await this.authService.signin(email, password, response);
    return user;
  }

  // Endpoint for user sign-up 
  // POST: /auth/signup
  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    // Call the authentication service's signup method to handle user sign-up
    const user = await this.authService.signup(email, name, password, response);
    return user;
  }

  // Endpoint to check and refresh the user's session
  // GET: /auth/userLoaded
  @Get('userLoaded')
  async userLoaded(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // Retrieve the refresh token from the Authorization header
    const refreshToken = request.headers.authorization;

    if (refreshToken) {
      // Call the authentication service's userLoaded method to verify and refresh the user's session
      const user = await this.authService.userLoaded(refreshToken, response);
      return user;
    } else {
      // If no refresh token is provided, return a message indicating that the user's session has expired
      return { message: 'User session expired' };
    }
  }

  // Endpoint for user logout
  // GET: /auth/logout
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // Call the authentication service's logout method to clear the user's session
    this.authService.logout(response);

    // You can return any response here if needed, such as a confirmation message
    return { message: 'Logged out successfully' };
  }
}

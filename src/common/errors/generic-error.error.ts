import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ErrorConstants} from '../consts/error.constant';

export enum ErrorCode {
  INVALID_RESTAURANT_NAME = 3000,
  RESTAURANT_NOT_FOUND = 3001,
  RESTAURANT_ALREADY_EXISTS = 3002,
  CUISINE_NOT_FOUND = 3003,
  CUISINE_ALREADY_EXISTS = 3004,
  USER_NOT_FOUND = 3005,
}

@Injectable()
export class InvalidRestaurantNameException extends BadRequestException {
  errorCode = ErrorCode.INVALID_RESTAURANT_NAME;
  constructor(title?: string, message?: string) {
    super({
      errorCode: ErrorCode.INVALID_RESTAURANT_NAME,
      message: message ?? 'Restaurant with name already exists. Please use a different name',
      title: title ?? ErrorConstants.GENERIC_ERROR_TITLE,
    });
    this.name = 'InvalidRestaurantNameException';
  }
}

@Injectable()
export class RestaurantNotFoundException extends NotFoundException {
  errorCode = ErrorCode.RESTAURANT_NOT_FOUND;
  constructor(title?: string, message?: string) {
    super({
      errorCode: ErrorCode.RESTAURANT_NOT_FOUND,
      message: message ?? 'Restaurant not found. Please use a different name',
      title: title ?? ErrorConstants.GENERIC_ERROR_TITLE,
    });
    this.name = 'RestaurantNotFoundException';
  }
}

@Injectable()
export class RestaurantAlreadyExists extends BadRequestException {
  errorCode = ErrorCode.RESTAURANT_ALREADY_EXISTS;
  constructor(title?: string, message?: string) {
    super({
      errorCode: ErrorCode.RESTAURANT_ALREADY_EXISTS,
      message: message ?? 'Restaurant Already Exists in your favorite list',
      title: title ?? ErrorConstants.GENERIC_ERROR_TITLE,
    });
    this.name = 'RestaurantAlreadyExists';
  }
}

@Injectable()
export class CuisineNotFoundException extends NotFoundException {
  errorCode = ErrorCode.CUISINE_NOT_FOUND;
  constructor(title?: string, message?: string) {
    super({
      errorCode: ErrorCode.CUISINE_NOT_FOUND,
      message: message ?? 'Cuisine not found. Please use a different name',
      title: title ?? ErrorConstants.GENERIC_ERROR_TITLE,
    });
    this.name = 'CuisineNotFoundException';
  }
}

@Injectable()
export class CuisineAlreadyExists extends BadRequestException {
  errorCode = ErrorCode.CUISINE_ALREADY_EXISTS;
  constructor(title?: string, message?: string) {
    super({
      errorCode: ErrorCode.CUISINE_ALREADY_EXISTS,
      message: message ?? 'Cuisine Already Exists in your favorite list',
      title: title ?? ErrorConstants.GENERIC_ERROR_TITLE,
    });
    this.name = 'CuisineAlreadyExists';
  }
}

@Injectable()
export class UserNotFoundException extends NotFoundException {
  errorCode = ErrorCode.USER_NOT_FOUND;
  constructor(title?: string, message?: string) {
    super({
      errorCode: ErrorCode.USER_NOT_FOUND,
      message: message ?? 'User not found',
      title: title ?? ErrorConstants.GENERIC_ERROR_TITLE,
    });
    this.name = 'UserNotFoundException';
  }
}

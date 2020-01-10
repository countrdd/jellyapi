// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Group, User} from '../models';
import {UserRepository} from '../repositories';
//import {RecommenderService} from '../services/recommender.service';
import {inject} from '@loopback/core';
import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

import {Credentials} from '../repositories/user.repository';
import {PasswordHasher} from '../services/hash.password.bcryptjs';

import {MailerServiceBindings, PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {CredentialsRequestBody, UserProfileSchema} from './specs/user-controller.specs';
import {MailerService} from '../services';

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    // public recommender: RecommenderService,
    @inject(MailerServiceBindings.SEND_MAIL) public mailerService: MailerService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) {
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    // ensure a valid email value and password value
    //validateCredentials(_.pick(user, ['email', 'password']));

    // encrypt the password
    // eslint-disable-next-line require-atomic-updates
    user.password = await this.passwordHasher.hashPassword(user.password);

    try {
      // create the new user
      const savedUser = await this.userRepository.create(user);
      delete savedUser.password;

      return savedUser;
    } catch (error) {
      console.log('******', error);
      // MongoError 11000 duplicate key
      if (error.code === 11000) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        console.log(error);
        throw error;
      }
    }
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @get('/users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId, {
      fields: {password: false},
    });
  }

  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
      currentUserProfile: UserProfile,
  ): Promise<UserProfile> {
    // (@jannyHou)
    // for symbol property
    currentUserProfile.id = currentUserProfile[securityId];
    delete currentUserProfile[securityId];
    return currentUserProfile;
  }


  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })

  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{this: undefined; token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    console.log('**', userProfile);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {this: undefined, ...userProfile, token};
  }

  // Update User Information
  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
      user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  // Test Email Send
  @get('/users/email', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Group model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')

  async emailTest(

    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<any> {
    const mailOptions = {
      from: 'countrdd@gmai.com',
      to: 'countrdd@leillc.net',
      subject: 'test',
      html: 'adjsfkjsdfkjasdfkjasdkfjasdkfjkdsjfj',
    };

    await this.mailerService.sendMail(mailOptions)
      .then(function(data) {
        return {message: `Successfully sent reset mail `};
      }).catch(function(data) {
        throw new HttpErrors.UnprocessableEntity(`Error in sending E-mail `);
      });
    // return null;
    //return this.groupRepository.count(where);
  }

}

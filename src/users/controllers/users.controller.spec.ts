import { User } from './../models/users.model';
import { UsersService } from './../services/users.service';
import { UsersController } from './users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../../auth/models/role.enum';

const userList: User[] = [
    new User({ name: 'Levy', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN }),
    new User({ name: 'usuario 1', email: 'user@user.com', password: 'Levy123', roles: Role.USUARIO }),
    new User({ name: 'usuario 2', email: 'resu@resu.com', password: 'Levy123', roles: Role.ADMIN })
];
const user = new User({ name: 'Levy Ronald', email: 'admin2@admin.com', password: 'Levy123', roles: Role.ADMIN })

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(user),
                        findAll: jest.fn().mockResolvedValue(userList),
                        findOne: jest.fn().mockResolvedValue(userList[0]),
                        update: jest.fn().mockResolvedValue(user),
                        remove: jest.fn().mockResolvedValue(true)
                    }
                }
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService)
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
        expect(usersService).toBeDefined();
    });
    describe('create', () => {
        it('should create a new user successfully', async () => {
            // Arrange
            const body = {
                name: 'Levy Ronald',
                email: 'admin2@admin.com',
                password: 'Levy123',
                roles: Role.ADMIN

            }
            // Act
            const result = await usersController.create(body);
            // Assert
            expect(result).toEqual(user);
        });
        it('should throw an expection', () => {
            // Arange
            const body = {
                name: 'Levy Ronald',
                email: 'admin2@admin.com',
                password: 'Levy123',
                roles: Role.ADMIN

            }
            jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());
            // Assert
            expect(usersController.create(body)).rejects.toThrowError();
        });
    })
    describe('findAll', () => {
        it('should return a user list successfully', async () => {
            // Act
            const result = await usersController.findAll();
            // Assert
            expect(result).toEqual(userList);
        });
        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());
            // Assert
            expect(usersController.findAll()).rejects.toThrowError()
        })
    });
    describe('findOne', () => {
        it('should get a user item successfully', async () => {
            // Act
            const result = await usersController.findOne('1')
            // Assert
            expect(result).toEqual(userList[0])
        })
        it('should throw an expection', () => {
            // Arrange
            jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());
            // Assert
            expect(usersController.findOne('1')).rejects.toThrowError()
        })
    })
    describe('update', () => {
        it('should get a user item successfully', async () => {
            // Arrange
            const body = {
                name: 'Admin', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN
            }
            const id = 'ff2k1ll3r';
            // Act
            const result = await usersController.update(id, body)
            // Assert
            expect(result).toEqual(user)
        });
        it('should throw an exception', () => {
            // Arrange
            const body = {
                name: 'Admin', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN
            }
            const id = 'ff2k1ll3r';
            jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());

            expect(usersService.update(id, body)).rejects.toThrowError();
        })
    })
    describe('remove', () => {
        it('should delete a user item successfully', async () => {
            // Act
            const id = 'ff2k1ll3r';
            const result = await usersController.remove(id)
            // Assert
            expect(result).toEqual(true)
        });
        it('should throw an exception',()=>{
            // Arrange
            const id = '23sdsd';
            jest.spyOn(usersService, 'remove').mockRejectedValueOnce(new Error());
            // Assert
            expect(usersController.remove(id)).rejects.toThrowError()
        })
    });
})
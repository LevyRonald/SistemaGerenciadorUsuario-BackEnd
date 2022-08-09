import { Role } from './../../auth/models/role.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../models/users.model';
import { UsersService } from './users.service';

const UserList: User[] = [
  new User({ name: 'Levy', email: 'admin@admin.com', password: 'Levy213', roles: Role.ADMIN }),
  new User({ name: 'User', email: 'user@user.com', password: 'Levy123', roles: Role.USUARIO }),
  new User({ name: 'Lucas', email: 'lucas@gmail.com', password: 'Levy123', roles: Role.ADMIN })
]
const user = new User({
  name: 'Levy', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN
})

describe('UsuariosService', () => {
  let usuariosService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: UsersService,
        useValue: {
            create: jest.fn().mockResolvedValue(user),
            findAll: jest.fn().mockResolvedValue(UserList),
            findOne: jest.fn().mockResolvedValue(user),
            update: jest.fn().mockResolvedValue(user),
            remove: jest.fn().mockResolvedValue(true),
        }
    }],
    }).compile();

    usuariosService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usuariosService).toBeDefined();
});
describe('findAll', () => {
    it('should return a user list successfully', async () => {
        const result = await usuariosService.findAll();

        expect(result).toEqual(UserList);
        expect(typeof result).toEqual('object');
        expect(usuariosService.findAll).toHaveBeenCalledTimes(1)
    });
    it('should throw an exception', () => {
        jest.spyOn(usuariosService, 'findAll').mockRejectedValueOnce(new Error());

        expect(usuariosService.findAll()).rejects.toThrowError();
    });
});
describe('create', () => {
    it('should create a new user successfully', async () => {
        const body = {
            name: 'Levy', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN
        }
        const result = await usuariosService.create(body);
        expect(result).toEqual(user)
        expect(usuariosService.create).toHaveBeenCalledTimes(1)
        expect(usuariosService.create).toHaveBeenCalledWith(body)
    });
    it('should throw an expection', () => {
        const body = {
            name: 'Levy', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN
        }
        jest.spyOn(usuariosService, 'create').mockRejectedValueOnce(new Error());

        expect(usuariosService.create(body)).rejects.toThrowError();
    })
});
describe('findOne', () => {
    it('should get a user item successfully', async () => {
        const id = 'ff1k1l3r';
        const result = await usuariosService.findOne(id)
        expect(result).toEqual(user)
        expect(usuariosService.findOne).toHaveBeenCalledTimes(1)
    });
    it('should throw an expection',()=>{
        const id = 'ff1k1l3r';
        jest.spyOn(usuariosService, 'findOne').mockRejectedValueOnce(new Error());

        expect(usuariosService.findOne(id)).rejects.toThrowError();
    });
});
describe('update',()=>{
    it('should get a user item successfully', async()=>{
        const body = {
            name: 'Levy', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN
        }
        const id = '23sdsd';
        const result = await usuariosService.update(id,body)
        expect(result).toEqual(user)
        expect(usuariosService.update).toHaveBeenCalledTimes(1)
    });
    it('should throw an expection',()=>{
        const body = {
            name: 'Levy', email: 'admin@admin.com', password: 'Levy123', roles: Role.ADMIN
        }
        const id = '23sdsd';
        jest.spyOn(usuariosService, 'update').mockRejectedValueOnce(new Error());

        expect(usuariosService.update(id,body)).rejects.toThrowError();
    })
});
describe('remove',()=>{
    it('should delete a user item successfully',async()=>{
        const id = '23sdsd';
        const result = await usuariosService.remove(id)
        expect(result).toEqual(true)
        expect(usuariosService.remove).toHaveBeenCalledTimes(1)
    });
    it('should throw an expection',()=>{
        const id = '23sdsd';
        jest.spyOn(usuariosService, 'remove').mockRejectedValueOnce(new Error());
        expect(usuariosService.remove(id)).rejects.toThrowError()
    })
});
});
import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "../../services/users/user.service";
import { CreateUserDto } from "src/application/dtos/create-user.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";



@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    async getUsers() {
        return this.userService.getUsers();
    }
}
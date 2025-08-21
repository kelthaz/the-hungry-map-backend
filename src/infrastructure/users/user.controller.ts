import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/application/dtos/users/create-user.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";



@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

@Post()
async create(@Body() createUserDto: CreateUserDto) {
  const user = await this.userService.createUser(createUserDto);
  return { id: user.id }; // aquí ya controlas qué se expone
}


    @Get()
    @ApiOperation({ summary: 'Get all users' })
    async getUsers() {
        return this.userService.getUsers();
    }
}
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeProps } from './employees.controller';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: CreateEmployeeProps) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return `This action returns all employees`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  async update(id: number, updateEmployeeDto: CreateEmployeeProps) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}

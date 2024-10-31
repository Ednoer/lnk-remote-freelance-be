import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, Query, BadRequestException, Request } from '@nestjs/common';
import { LoopEmailService } from '../services/loop-email.service';
import { CreateLoopEmailDto } from '../models/dto/create-loop-email.dto';
import { UpdateLoopEmailDto } from '../models/dto/update-loop-email.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { LoopEmail } from '../models/entities/loop-email.entity';
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { EmailService } from '../services/email.service';
import { SendEmailDto } from '../models/dto/send-email.dto';

@ApiTags('Loop Email')
@Controller('loop-email')
export class LoopEmailController {
  constructor(
    private readonly loopEmailService: LoopEmailService,
    private readonly emailService: EmailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new loop email' })
  @ApiResponse({ status: 201, description: 'The loop email has been successfully created.' })
  @ApiBearerAuth('JWT')
  async create(@Body() createLoopEmailDto: CreateLoopEmailDto, @Request() req) {
    const { email } = req.user;
    return this.loopEmailService.create(createLoopEmailDto, email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all loop emails' })
  @ApiResponse({ status: 200, description: 'Return all loop emails.', type: [LoopEmail] })
  @ApiQuery({ name: 'month', required: true, description: 'Filter by creation month in YYYY-MM format' })
  @ApiBearerAuth('JWT')
  async findAll(@Query('month') month: string) {
    const isValidFormat = /^\d{4}-\d{2}$/.test(month);
    if (!isValidFormat) {
      throw new BadRequestException('Invalid month format. Use YYYY-MM.');
    }

    const result = await this.loopEmailService.findAll(month)
    return {
      data: result
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a loop email by id' })
  @ApiResponse({ status: 200, description: 'Return a loop email.', type: LoopEmail })
  async findOne(@Param('id') id: string) {
    const result = await this.loopEmailService.findOne(id);
    return {
      data: result
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a loop email by id' })
  @ApiResponse({ status: 200, description: 'The loop email has been successfully updated.' })
  @ApiBearerAuth('JWT')
  async update(@Param('id') id: string, @Body() updateLoopEmailDto: UpdateLoopEmailDto, @Request() req) {
    const { email } = req.user;
    return this.loopEmailService.update(id, updateLoopEmailDto, email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a loop email by id' })
  @ApiResponse({ status: 200, description: 'The loop email has been successfully deleted.' })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: string) {
    return this.loopEmailService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-email')
  @ApiOperation({ summary: 'Send an email' })
  @ApiResponse({ status: 201, description: 'Email has been sent successfully.' })
  @ApiBearerAuth('JWT')
  async sendEmail(
    @Body() sendEmailDto: SendEmailDto
  ) {
    await this.emailService.sendEmail(sendEmailDto.to, sendEmailDto.subject, sendEmailDto.text, sendEmailDto.html);
    return { message: 'Email sent successfully' };
  }
}

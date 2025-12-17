import { Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  internshipType: string;
  timePeriod: string;
  fromDate: string;
  toDate: string;
  timestamp: string;
  status: 'Pending' | 'Confirmed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IConfirmedIntern extends Document {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  internshipType: string;
  timePeriod: string;
  fromDate: string;
  toDate: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
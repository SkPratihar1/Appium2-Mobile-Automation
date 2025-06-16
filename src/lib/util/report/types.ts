// src/lib/util/report/types.ts

export interface Report {
    reportName: string;
    status: string;
    duration: number;
  }
  
  export interface ReportData {
    title: string;
    reports: Report[];
    date: string;
  }
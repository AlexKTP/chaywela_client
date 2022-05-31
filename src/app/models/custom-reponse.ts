export interface CustomReponse {
    timestamp: Date;
    statusCode: number;
    reason: string;
    message: string;
    developerMessage: string;
    data: {objList?: any[], obj?: any}

}
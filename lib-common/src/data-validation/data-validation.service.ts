import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator'; // 예시용, 실제 구현에 맞게 조정 필요

@Injectable()
export class DataValidationService {
    async validate(data: any) {
        // 여기에 데이터 검증 로직 구현
        await validateOrReject(data);
    }
}

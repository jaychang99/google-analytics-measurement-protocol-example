import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GA_EVENT_API_BASE_URL } from 'src/common/constants/baseUrls';
import { GaEventResponseDto } from 'src/common/dtos/ga-event-response.dto';
import { EnvironmentVariables } from 'src/common/types/environmentVariables';
import { GaMeasurementProtocolPayload } from 'src/common/types/gaMeasurementProtocolPayload';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendGaEvent(): Promise<GaEventResponseDto> {
    // Send the event to Google Analytics
    console.log('Event sent to Google Analytics');

    const gaEventQueryParams = {
      measurement_id: this.configService.get('GA_MEASUREMENT_ID'),
      api_secret: this.configService.get('GA_API_SECRET'),
    };
    const gaEventQueryString = new URLSearchParams(
      gaEventQueryParams,
    ).toString();
    const gaEventApiUrl = `${GA_EVENT_API_BASE_URL}?${gaEventQueryString}`;

    try {
      await axios.post<
        unknown,
        unknown,
        GaMeasurementProtocolPayload<{ client_id: string }>
      >(gaEventApiUrl, {
        client_id: 'abcdef',
        events: [
          {
            name: 'test_event_from_server',
            params: {
              client_id: 'abcdef',
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error sending event to Google Analytics', error);
      return {
        message: 'Error sending event to Google Analytics',
        error: error.message,
      };
    }

    return {
      message: 'Event sent to Google Analytics',
    };
  }
}

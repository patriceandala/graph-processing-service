export class TransitionDto {
  action: 'S' | 'R'; // SEND or RETURN
  rule: 'A' | 'P' | 'U' | 'C'; // ADMIN, PARTNER, USER, COURIER
  type: 'S' | 'B'; // SINGLE or BULK
}

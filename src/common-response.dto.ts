export class CommonResponseDto {
  status: "success" | "error";
  data: any;
  message: string;
}
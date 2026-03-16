export interface CustomError extends Error {
  errorCode?: string;
  errors?: string
}
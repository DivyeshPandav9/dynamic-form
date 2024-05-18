export interface EmpData {
  name: string
  age: number | undefined
  department: string
  job_title: string
  salary: number | undefined
}

export interface Todo {
  id: string
  name: string
  job_title: string
  age: number
  salary: number
  department: string
}

export interface Errors {
  [key: string]: string
}

export interface FormErrors {
  name: string
  email: string
  password: string
}
export interface ErrorObject {
  message: string
}
export interface ListItem {
  id: string
  // Other properties of your item
}

export interface AuthData {
  name: string
  email: string
  password: string
}
export interface authList {
  authData: AuthData[]
  error: ErrorObject

  loading: boolean
}
export interface initialStateType {
  empList: FieldInput[]
  error: ErrorObject
  loading: boolean
 
}
export interface initialStateType1 {
  // dataList:dataListType[],
  error: string
  loading: boolean
}

export interface dataTypes {
  label: string
  placeholder: string | undefined
  type: string
  required: boolean | undefined
  id: string
  class: number
  email: string
  fname: string
  lname: string
  pnumber: number
}

export interface FieldInput {
  id?: string
  label: string
  type: string
  name: string
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  required?: boolean
}

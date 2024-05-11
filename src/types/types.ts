export interface EmpData {

    name: string;
    age: number | undefined;
    department: string;
    job_title: string;
    salary: number | undefined;

}

export interface Todo {
    id: string;
    name: string;
    job_title: string;
    age: number;
    salary: number;
    department: string;
}


export interface Errors {
    [key: string]: string;
}


export interface ErrorObject {
    message: string;
}


export interface initialStateType {
    empList: FieldInput[],
    error: ErrorObject,
    updateList: EmpData,
    searchList: Todo[],
    loading: boolean,
    currentUser: string | null;
}
export interface initialStateType1 {
    // dataList:dataListType[],
    error: string,
    loading: boolean
}

// export interface dataListType{
//     [key: string]: string | number; 
//     fname:string,
//     lname:string,
//     class:number,
//     pnumber:number,
//     email:string
// }
export interface dataTypes {
    label: string;
    placeholder: string | undefined;
    type: string;
    required: boolean | undefined;
    id:string,
    class:number,
    email:string,
    fname:string,
    lname:string,
    pnumber:number
}

export interface FieldInput {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    required?: boolean;
}


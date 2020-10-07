export interface Employ {
    $key: string,
    fullName: string,
    email: string,
    mobile: string,
    city: string,
    gender: boolean,
    department: Array<string>,
    hireDate: Date,
    isPermanent: boolean
}

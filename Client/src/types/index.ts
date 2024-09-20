export interface User{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    age?:string;
    token?:string;
}

export interface StateInterface{
    user: User | undefined | null;
}

export interface ActionInterface{
    type: "LOGIN" | "LOGOUT";
    payload?: User;
}

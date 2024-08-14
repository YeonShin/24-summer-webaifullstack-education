export enum CountActionType {
    PLUS = "plus",
    MINUS = "minus",
    INIT = "init",
};

export interface ActionType {
    type: CountActionType;
}
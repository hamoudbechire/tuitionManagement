
export enum CartStatus {
    Created = 0,
    Submitted = 1,
}

export enum OrderSatus{
   Submitted='submitted',
   Accepted='accepted',
   Refused='refused',
   Delivred='delivred',
   Paid='paid',
   Cancelled="cancelled"
}
export enum MediaType {
    File = 0,
    Video = 1,
    Document = 2,
    Image = 3
}
export enum LanguageDirection {
    LTR,
    RTL
}
export enum Rating
{
    VeryBad=1,
    Bad = 2,
    Good = 3,
    VeryGood = 4,
    Excellent=5,
    
}

export enum UserLoginType{
    
    Buyer,
    Seller,
}
export enum NotificationTypes
{
    All = 0,
    Statut = 1,
    ProductReviews = 2,
    order = 3
}
export enum Note
{
    VeryUsless = -2,
    Usless = -1,
    Medium = 0,
    Useful = 1,
    VeryUseful = 2
}
export enum CodeStatus
{
    Sent = 0,
    ToBeSent = 1,
    AlreadyUsed = 2
}
export enum AccountActionType
{
    restPassword = 0,
    enableAcccount = 1
}
export enum AccountType
{
    Twitter,
    Facebook,
    LinkedIn,
    Gmail,
}
export enum ConnectionStatus {
    Online,
    Offline
  }

  export enum UserType{
    Customer,
    Seller,
    DeliveryMan
}

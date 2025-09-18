# DevTinder APIs

## authRouter
-POST /signup
-POST /login
-POST /logout

## profile
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/rewiew/accepted/:requestId
- POST /request/rewiev/rejected/:requestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
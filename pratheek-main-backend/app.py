from __future__ import print_function
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from astrapy import DataAPIClient
import bcrypt
import uuid
import ast #Needed to convert hashed password from string to bytes
import time
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from pprint import pprint

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = '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'


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TOKEN = "AstraCS:cKZBYYDdfssheZOePSlCzXtc:7357d8ce24e22e95b74c1e7b06649292de437c63ddcfbe8e6d70cfbe6c107e4e"
client = DataAPIClient(TOKEN)
db = client.get_database_by_api_endpoint(
  "https://fe697207-2f4a-4f43-b461-d75e29646c3a-us-east-2.apps.astra.datastax.com"
)


#GLOBAL VARIABLES:


actorTable = db.get_table("actors")
studioTable = db.get_table("studios")


def encrptPassword(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt)


def verifyPasswords(password:str, hashedPassword:str) -> bool:
    hashedPassword = ast.literal_eval(hashedPassword) 
    return bcrypt.checkpw(password.encode("utf-8"), hashedPassword)

class ActorSignUpData(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    phoneNum: int
    age: int
    gender: str
    intro: str
    location: str
    pfp: str
    genres: List[str]
    height: str
    weight: str


@app.post("/actorSignUp")
def actorSignUp(data: ActorSignUpData):
    
    firstName = data.firstName
    lastName = data.lastName
    email = data.email
    password = data.password
    phoneNum = data.phoneNum
    age = data.age
    gender = data.gender
    intro = data.intro
    location = data.location
    pfp = data.pfp
    genres = data.genres
    height = data.height
    weight = (data.weight + " lbs")

    id = uuid.uuid4()
    hashedPass = encrptPassword(password)

    userData = {
        "id": id,
        "age": age,
        "email": email,
        "firstname": firstName,

        "gender": gender,
        "genres": genres,
        "intro": intro,
        "lastname": lastName,
        "location": location,
        "password": str(hashedPass),
        "pfp": pfp,
        "phonenum": str(phoneNum),
        "height": height,
        "weight": weight
    }
    actorTable.insert_one(userData)
    response = {
        "message": "Success"
    }
    return JSONResponse(response)


class StudioSignUpData(BaseModel):
    studioName: str
    personContact: str
    roleOfPerson: str
    studioPhoneNum: str
    studioEmail: str
    studioPass: str

@app.post("/studioSignUp")
def studioSignUp(data: StudioSignUpData):
    studioName = data.studioName
    personContact = data.personContact
    roleOfPerson = data.roleOfPerson
    studioPhoneNum = data.studioPhoneNum
    studioEmail = data.studioEmail
    studioPass = data.studioPass

    hashedpass = encrptPassword(studioPass)
    id = uuid.uuid4()

    userData = {
        "id": id,
        "studioname": studioName,
        "personcontact": personContact,
        "roleofperson": roleOfPerson,
        "studiophonenum": str(studioPhoneNum),
        "studioemail": studioEmail,
        "studiopass": str(hashedpass)
    }
    studioTable.insert_one(userData)
    response = {
        "message": "Success"
    }
    return JSONResponse(response)

class ActorLogInData(BaseModel):
    email: str
    password: str

@app.post("/actorLogIn")
def actorLogIn(data: ActorLogInData):
    email = data.email
    password = data.password

    existingUser = list(actorTable.find({"email": email}))
    if (existingUser):
        databasePass = existingUser[0]["password"]
        if (verifyPasswords(password, databasePass)):
            print("Successfully Log In!")
            response = {
                "message": "Success",
                "user": {
                    "id": str(existingUser[0]["id"]),
                    "age": existingUser[0]["age"],
                    "email": existingUser[0]["email"],
                    "firstname": existingUser[0]["firstname"],
                    "gender": existingUser[0]["gender"],
                    "genres": existingUser[0]["genres"],
                    "height": existingUser[0]["height"],
                    "intro": existingUser[0]["intro"],
                    "phonenum": existingUser[0]["phonenum"],
                    "lastname": existingUser[0]["lastname"],
                    "location": existingUser[0]["location"],
                    "pfp": existingUser[0]["pfp"]
                }
            }
            return JSONResponse(response)
        else:
            print("Password do not match!")
    else:
        print("No account found with that email!")



class StudioLogInData(BaseModel):
    studioEmail: str
    studioPassword: str

@app.post("/studioLogIn")
def studioLogIn(data:StudioLogInData):
    studioEmail = data.studioEmail
    studioPassword = data.studioPassword

    existingUser = list(studioTable.find({"studioemail": studioEmail}))
    if (existingUser):
        databasePass = existingUser[0]["studiopass"]
        if (verifyPasswords(studioPassword, databasePass)):
            response = {
                "message": "Success",
                "studioemail": studioEmail
            }
            print(f"Response: {response}")
            print("I am here!")
            return JSONResponse(response)
        else:
            print("Passwords do not match!")
    else:
        print("No account found with that email!")

class actor_data(BaseModel):
    email: str

@app.post("/getActorDash")
def ActorDash(data: actor_data):

    actor = list(actorTable.find({"email": data.email}))  #Pratheek

    print(actor[0])
    #print(f"Actor's Name: {actor[0]['username']}")


    response = {
    "name": actor[0]['firstname'] + actor[0]['lastname'],
    "age": actor[0]['age'],
    "email": actor[0]['email'],
    "gender": actor[0]['gender'],
    "genres": list(actor[0]['genres']),  # if it's a set, convert to list
    "intro": actor[0]['intro'],
    "location": actor[0]['location'],
    "pfp": actor[0]['pfp'],
    "phone": actor[0]['phonenum'],
    "height":actor[0]['height'],
    "weight":actor[0]['weight']
    }
    return JSONResponse(response)

class studio_data(BaseModel):
    email: str


@app.post("/getStudioDash")
def StudioDash(data: studio_data):

    studio = list(studioTable.find({"studioemail": data.email}))  #Pratheek

    print(studio[0])
    #print(f"Actor's Name: {actor[0]['username']}")


    response = {
        "studioname": studio[0]['studioname'],
        "email": studio[0]['studioemail'],
        "manager": studio[0]['personcontact'],
        "number": studio[0]['studiophonenum'],
        "uid": str(studio[0]['id']),  # Convert UUID to string
    }
    return JSONResponse(response)

roleTable = db.get_table("roles")

class role_data(BaseModel):
    movie: str
    genres: List[str]
    plot: str
    age: str
    gender: str
    role: str
    studioemail: str
    studio: str

@app.post("/putNewRoles")
def Roles(data: role_data):

    roleData={
        "id":uuid.uuid4(), #Pratheek
        "studioid":uuid.uuid4(), #Pratheek
        "moviegenres":data.genres,
        "movieplot":data.plot,
        "movietitle":data.movie,
        "roleage":data.age,
        "rolegender":data.gender,
        "rolename":data.role,
        'studioemail':data.studioemail, #Prxatheek
        'studioname':data.studio
    }

    roleTable.insert_one(roleData)



@app.post("/getRoles")
def getRoles(data: studio_data):

    roles = list(roleTable.find({"studioemail": data.email}))  #Pratheek

    print(roles[0])
    #print(f"Actor's Name: {actor[0]['username']}")

    all_roles = []
    for role in roles:
        role_info = {
            "moviegenres": role.get('moviegenres'),
            "movieplot": role.get('movieplot'),
            "movietitle": role.get('movietitle'),
            "roleage": role.get('roleage'),
            "gender": role.get('rolegender'),
            "role": role.get('rolename'),
        }
        all_roles.append(role_info)

    return JSONResponse(content=all_roles)




matchTable = db.get_table("matches")

@app.post("/getActorRoles")
def getActorRoles(data: actor_data):

    print(f"Data.email = {data.email}")

    matches = list(matchTable.find({"email": data.email}))  #Pratheek

    print(matches[0])
    #print(f"Actor's Name: {actor[0]['username']}")

    all_matches = []
    for match in matches:
        match_info = {
            "role": match.get('rolename'),
            "movie": match.get('moviename'),
            "studio": match.get('studioname'),
            "status": match.get('status'),
        }
        all_matches.append(match_info)

    return JSONResponse(content=all_matches)


class recommendedData(BaseModel):
    email: str

@app.post("/getRecommended")
def getRecommended(data: recommendedData):
    actorEmail = data.email

    existingUser = list(actorTable.find({"email": actorEmail}))
    if not existingUser:
        return {"message": "Actor not found", "recommended_roles": []}

    userGenres = set(existingUser[0].get("genres", [])) 

    # Get all roles from the roles table
    allRoles = list(roleTable.find({}))  

    all_Roles = []
    
    for role in allRoles:
        roleGenres = set(role.get("moviegenres", []))
        if userGenres & roleGenres:  # Check for at least one common genre
            roleInfo = {
                "id": str(role.get("id")),
                "moviegenres": role.get("moviegenres"),
                "movieplot": role.get("movieplot"),
                "movietitle": role.get("movietitle"),
                "roleage": role.get("roleage"),
                "rolegender": role.get("rolegender"),
                "rolename": role.get("rolename"),
                "studioemail": role.get("studioemail"),
                "studioid": str(role.get("studioid")),
                "studioname":role.get("studioname"),
            }
            all_Roles.append(roleInfo)
            
    print(f"All roles: {all_Roles}")
    return JSONResponse(all_Roles)
    



class insertData(BaseModel):
    email: str
    moviename: str
    rolename: str
    status: str
    studioemail: str
    studioname: str


@app.post("/insertActorRightSwipes")
def insertActorRightSwipes(data:insertData):
    email = data.email
    moviename = data.moviename
    rolename = data.rolename
    status = data.status
    studioemail = data.studioemail
    studioname = data.studioname
    id = uuid.uuid4()

    userData = {
        "id": id,
        "moviename": moviename,
        "email": email,
        "rolename": rolename,
        "status": status,
        "studioname": studioname,
        "studioemail": studioemail
    }

    matchTable.insert_one(userData)
    print("Successfully inserted match data!")

class email_data(BaseModel):
    email: str
    studioemail:str
    role: str
    movie: str
    studio: str
    name: str
    status: str

@app.post("/sendEmail")
def sendEmail(data: email_data):
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    
    # Sender and recipient details
    sender = {"name": "InstaCast", "email": "work@instacast.com"}
    to = [{"email": data.email, "name": data.name}]
    reply_to = {"email": data.studioemail, "name": data.studio}
    
    # Parameters for the template placeholders
    params = {
        "role": data.role,  # Replace with actual template placeholders
        "movie": data.movie,
        "studio":data.studio,
    }
    
    # Define the transactional template ID
    template_id = 9  # Replace with your actual template ID from Sendinblue
    
    # Create the SendSmtpEmail object using the template ID and params
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=to,
        reply_to=reply_to,
        sender=sender,
        template_id=template_id,  # Use the template ID here
        params=params  # Pass params for the placeholders
    )

    try:
        # Send the email using the transactional template
        api_response = api_instance.send_transac_email(send_smtp_email)
        pprint(api_response)
    except ApiException as e:
        print(f"Exception when calling SMTPApi->send_transac_email: {e}\n")

@app.post("/sendEmailDec")
def sendEmailDec(data: email_data):
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    
    # Sender and recipient details
    sender = {"name": "InstaCast", "email": "work@instacast.com"}
    to = [{"email": data.email, "name": data.name}]
    reply_to = {"email": data.studioemail, "name": data.studio}
    
    # Parameters for the template placeholders
    params = {
        "role": data.role,  # Replace with actual template placeholders
        "movie": data.movie,
        "studio":data.studio,
        "status":data.status,
    }
    
    # Define the transactional template ID
    template_id = 10  # Replace with your actual template ID from Sendinblue
    
    # Create the SendSmtpEmail object using the template ID and params
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=to,
        reply_to=reply_to,
        sender=sender,
        template_id=template_id,  # Use the template ID here
        params=params  # Pass params for the placeholders
    )

    try:
        # Send the email using the transactional template
        api_response = api_instance.send_transac_email(send_smtp_email)
        pprint(api_response)
    except ApiException as e:
        print(f"Exception when calling SMTPApi->send_transac_email: {e}\n")


class matchedData(BaseModel):
    email: str

@app.post("/getSwipedActors")
def getSwipedActors(data: matchedData):
    studioemail = data.email
    print(studioemail)

    databaseData = list(matchTable.find({"studioemail": studioemail}))

    actorEmail = databaseData[0]["email"]
    moviename = databaseData[0]["moviename"]
    rolename = databaseData[0]["rolename"]
    currStatus = databaseData[0]["status"]

    ALL_INFO = []

    for role in databaseData:
        if role.get("status") == "pending":
            actorEmail = role.get("email")
            existingUser = list(actorTable.find({"email": actorEmail}))
            role_info = {
                "actoremail": actorEmail,
                "moviename": role.get("moviename"),
                "rolename": role.get("rolename"),
                "firstName": existingUser[0]["firstname"],
                "lastName": existingUser[0]["lastname"],
                "actorGender": existingUser[0]["gender"],
                "actorAge": existingUser[0]["age"],
                "actorHeight": existingUser[0]["height"],
                "actorWeight": existingUser[0]["weight"],
                "actorIntro": existingUser[0]["intro"],
                "actorGenres": existingUser[0]["genres"],
                "actorPfp": existingUser[0]["pfp"],
                "actornum": existingUser[0]["phonenum"],
                "actorlocation": existingUser[0]["location"]
            }
            ALL_INFO.append(role_info)



    return JSONResponse(ALL_INFO)



class receivedData(BaseModel):
    status: str
    actoremail: str
    rolename: str

@app.post("/updateMatchDb")
def updateMatchDb(data: receivedData):
    statusMessage = data.status
    actorEmail = data.actoremail
    roleName = data.rolename
    
    filter_criteria = {"email": {"$eq": actorEmail}, "rolename": {"$eq": roleName}}

    databaseData = list(matchTable.find(filter=filter_criteria))

    uniqueID = databaseData[0]["id"]

    matchTable.update_one(
        filter={"id": uniqueID},
        update = {
            "$set": {"status": statusMessage}
        }
    )











#uvicorn main:app --reload --port 8000 ----->> To run the backend
#python3 -m pip install fastapi uvicorn
from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from astrapy import DataAPIClient
import bcrypt
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TOKEN = "AstraCS:cKZBYYDdfssheZOePSlCzXtc:7357d8ce24e22e95b74c1e7b06649292de437c63ddcfbe8e6d70cfbe6c107e4e"
client = DataAPIClient(TOKEN)
db = client.get_database_by_api_endpoint(
    "https://fe697207-2f4a-4f43-b461-d75e29646c3a-us-east-2.apps.astra.datastax.com"
)

actorTable = db.get_table("actors")

@app.post("/getActorDash")
def ActorDash():

    actor = list(actorTable.find({"email": "pratheek0928@gmail.com"}))  #Pratheek

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

studioTable = db.get_table("studios")

@app.post("/getStudioDash")
def StudioDash():

    studio = list(studioTable.find({"studioemail": "pratheek0928@gmail.com"}))  #Pratheek

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
        'studioemail':"pratheek0928@gmail.com" #Pratheek
    }

    roleTable.insert_one(roleData)

class studio_data(BaseModel):
    email: str

@app.post("/getRoles")
def getRoles(data: studio_data):

    roles = list(roleTable.find({"studioemail": "pratheek0928@gmail.com"}))  #Pratheek

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


class actor_data(BaseModel):
    email: str

matchTable = db.get_table("matches")

@app.post("/getActorRoles")
def getActorRoles(data: actor_data):

    matches = list(matchTable.find({"email": "pratheek0928@gmail.com"}))  #Pratheek

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



#uvicorn main:app --reload --port 8000 ----->> To run the backend
#python3 -m pip install fastapi uvicorn

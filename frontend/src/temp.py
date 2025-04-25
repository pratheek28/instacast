from astrapy import DataAPIClient
import uuid


TOKEN = "AstraCS:cKZBYYDdfssheZOePSlCzXtc:7357d8ce24e22e95b74c1e7b06649292de437c63ddcfbe8e6d70cfbe6c107e4e"
client = DataAPIClient(TOKEN)
db = client.get_database_by_api_endpoint(
  "https://fe697207-2f4a-4f43-b461-d75e29646c3a-us-east-2.apps.astra.datastax.com"
)

rolesTable = db.get_table("roles")
studioTable = db.get_table("studios")
actorTable = db.get_table("actors")
matchesTable = db.get_table("matches")



existingUser = list(actorTable.find({"email": "pratheek0928@gmail.com"}))
existingStudio = list(studioTable.find({"studioemail": "pratheek0928@gmail.com"}))
existingRoles = list(rolesTable.find({"studioemail": "pratheek0928@gmail.com"}))


id = uuid.uuid4()
email = existingUser[0]["email"]
moviename = existingRoles[0]["movietitle"]
rolename = existingRoles[0]["rolename"]
status = "pending"
studioemail = existingStudio[0]["studioemail"]
studioname = existingStudio[0]["studioname"]

userData = {
    "id": id,
    "email": email,
    "moviename": moviename,
    "rolename": rolename,
    "status": status,
    "studioemail": studioemail,
    "studioname": studioname
}

matchesTable.insert_one(userData)
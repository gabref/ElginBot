import sys
import json
from youtubesearchpython import *


channel_id = "UCHi3XOV29069nPfqeCNrHTA"

try:
    playlist = Playlist(playlist_from_channel_id(channel_id))

    resp = {
        "id": playlist.videos[0]['id'],
        "title": playlist.videos[0]['title'],
        "linkVideo": playlist.videos[0]['link'],
        "thumbnail": playlist.videos[0]['thumbnails'][0]['url'],
        "channel": playlist.videos[0]['channel']['name'],
        "error": "false"
    }
    print(json.dumps(resp))
    sys.stdout.flush()

except:
    resp = {
        "error": "true"
    }
    print(json.dumps(resp))
    sys.stdout.flush()
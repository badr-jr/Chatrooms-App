from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter,URLRouter
import serverws.routing
application = ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(
        URLRouter(
            serverws.routing.websocket_urlpatterns
        )
    ),
})
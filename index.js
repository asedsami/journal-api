const { Server } = require('@logux/server')
global.clog = console.log

const server = new Server(
	Server.loadOptions(process, {
		subprotocol: '1.0.0',
		supports: '1.x',
		root: __dirname
	})
)

server.auth(
	({ userId, token }) => (process.env.NODE_ENV === 'development')
)

server.type('counter/incremented', {
	access (ctx, action, meta) {
		clog('counter/incremented', 'access')
		return true
	},
	resend (ctx, action) {
		clog('counter/incremented', 'resend')
		return { channel: 'user/asedsami' }
	},
	process (ctx, action, meta) {
		clog('counter/incremented', 'process')
		return 'hello'
	}
})

server.type('counter/decremented', {
	access (ctx, action, meta) {
		clog('counter/decremented', 'access')
		return true
	},
	resend (ctx, action) {
		clog('counter/decremented', 'resend')
		return { channel: 'user/asedsami' }
	},
	process (ctx, action, meta) {
		clog('counter/decremented', 'process')
		return 'hello'
	}
})


server.listen()
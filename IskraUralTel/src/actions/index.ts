export const anyHandlerAction = (payload: any) => {
	return {
		type: "ANY_HANDLER_ACTION",
		payload,
	}
}

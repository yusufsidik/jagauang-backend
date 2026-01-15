export function validate(schema, request){
    const result = schema.validate(request)

    if(result.error){
        throw new Error(result.error?.message)
    } else {
        return result.value
    }
}
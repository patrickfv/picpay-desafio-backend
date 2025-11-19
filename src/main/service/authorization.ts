type HttpAuthorize = { 
    status: string
    data: { authorization: boolean } 
}

export const getAuthorization = async(): Promise<boolean> =>{ 

    const res = await fetch('https://util.devi.tools/api/v2/authorize')
    const json: HttpAuthorize = await res.json()
    /*    .then(res => res.json())
        .then(data => console.log(data))
    */
    return json.data.authorization
}

getAuthorization()
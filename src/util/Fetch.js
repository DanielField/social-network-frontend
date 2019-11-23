export async function post(route, data) {
    let res = await fetch('http://localhost:3001' + route, {
        method: 'post',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': localStorage.usertoken
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function get(route) {
    let res = await fetch('http://localhost:3001' + route, {
        method: 'get',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': localStorage.usertoken
        }
    });

    return res.json();
}
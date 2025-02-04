import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


//ye ek higher order fn hai jo ki aapse expect karta h ek children childern accept krne ke baad check karta 
// h  ki kya user exist krta h agar user exist karta h to ye aapko home pe navigate kr dega nhi to  ye aapko 
// wapis login page pe redirect kr dega

const UserProtectWrapper = ({
    children
}) => {
    
    const token = localStorage.getItem('token')

    //agar user ne login karne ke baad page reload kr diya to to fir sara data chala jayega to ham 
    // isse bachne ke liye token ka use krte h isliye ham check karenge ki token exist krta  h ya nhi h


    const navigate = useNavigate()

    const { user, setUser } = useContext(UserDataContext)
    //ye jo user h wo login page pe setuser ki help se new value set ho gyi thi 
    // const { user, setUser } = useContext(UserDataContext)
    //using above fn ... now agar ab user exist keta hoga to thik h 
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            //agar toke nhi exist karta hoga to login pe return kr jayegnge 
            navigate('/login')
        }

        //ab ham token ko validate karne ke liye databse de user ki profile fetch karenge and agar waha se
        //  response sahi ata h to ham home pe jayenge nhi to catch ke andar se wapis login pe chale jaynge 
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper
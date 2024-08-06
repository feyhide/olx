import {redis} from '../index.js'

export const getCachedData = (key) => async (req,res,next) => {
    let data = await redis.get(key)
    
    if(data){
        return res.json(JSON.parse(data))
    }

    next();
}

export const getCachedUser = (key) => async (req,res,next) => {
    const cachedkey = `${key}:${req.user.id}`
    let data = await redis.get(cachedkey)
    console.log(cachedkey)
    if(data){
        return res.json(JSON.parse(data))
    }

    next();
}

export const deleteCachedUser = () => async (req,res,next) => {
    const cachedkey = `${key}:${req.user.id}`
    await redis.del(cachedkey)
    next();
}

export const deleteCachedData = (key) => async (req,res,next) => {
    await redis.del(key)
    next();
}
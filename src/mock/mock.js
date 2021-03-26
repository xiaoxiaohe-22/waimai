import Mock from "mockjs"
import shopData from "./data.json"

Mock.mock("/api/getData",{
    code:0,
    data:shopData
})
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_1 = require(".././helper/generate");
const md5_1 = __importDefault(require("md5"));
const userResolvers = {
    Query: {
        getUser: (__, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const users = context.req.user;
            if (users.token === undefined || users.token === null) {
                return {
                    code: 401,
                    message: "Unauthorized",
                    success: false,
                };
            }
            const user = yield user_model_1.default.findOne({ token: users.token, deleted: false });
            if (user) {
                return {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    token: user.token,
                    message: "User found",
                    code: 200,
                };
            }
            else {
                return {
                    code: 404,
                    message: "User not found",
                    success: false,
                };
            }
        }),
    },
    Mutation: {
        registerUser: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            console.log("User registration data:", user);
            const existEmail = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false,
            });
            if (existEmail) {
                return {
                    code: 400,
                    success: false,
                    message: "Email already exists",
                };
            }
            const token = (0, generate_1.generateRandomString)(20);
            const newUser = new user_model_1.default({
                fullName: user.fullName,
                email: user.email,
                password: (0, md5_1.default)(user.password),
                token: token,
            });
            yield newUser.save();
            return {
                code: 200,
                success: true,
                message: "User registered successfully",
                email: newUser.email,
                token: newUser.token,
                id: newUser._id,
                fullName: newUser.fullName,
            };
        }),
        loginUser: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            console.log("User login data:", user);
            const existingUser = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false,
            });
            if (!existingUser) {
                return {
                    code: 404,
                    success: false,
                    message: "User not found",
                };
            }
            if (existingUser.password !== (0, md5_1.default)(user.password)) {
                return {
                    code: 401,
                    success: false,
                    message: "Invalid password",
                };
            }
            return {
                code: 200,
                success: true,
                message: "User logged in successfully",
                email: existingUser.email,
                token: existingUser.token,
                id: existingUser._id,
                fullName: existingUser.fullName,
            };
        }),
    },
};
exports.default = userResolvers;

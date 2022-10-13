import styled from 'styled-components';
import { Card, Image } from 'antd';
import routes from 'utils/routes';
import logo from 'images/company-brand.png';
import Link from 'components/Link';
import Form from './Form';
import { font } from 'utils/font';

// Card
// Login Panel

// TODO: 程式設計思考：
// 1. 演算法：輸入 -> .... -> 輸出
// 2. 角度一：生產者 -> .... -> 消費者
// 3. 角度二：底層 -> .... -> 上層
// 4. 角度三：材料 -> .... -> 商品
// 5. 角度 N： ...

// 換句話說，當我們在編寫時，要思考自己在整個程式的哪個架構；
// 意思就是，我們有什麼材料、資料可以拿，我們想要產出什麼？
// 如果當我們，材料、資料取得後，到要產出的結果，中間處理非常繁雜時，就要將問題拆分
// 意思就是，你的材料、資料，太粗糙，需要先進行初步加工，在後面的製程才能更順利
// 這個時候就要思考，每一次的加工，要達到什麼樣的效果？能夠讓下一階段更好的使用？
// 通常這個過程就稱之為『優化』，然而『大量抽象性的思考通常不是很容易，也容易離實際應用場景背離』
// 所以『優化』這個過程是反覆的、重構的

// styled component 的材料是 網頁上各種 HTML Element 服務的是 React 基礎的元件
// 那麼當你需要組合出頁面時，中間可能還會需要經過自己產出的元件（加工過程），
// 這時就要思考這一階段要產出什麼，達到什麼效果？

function SignIn({ className }: { className: string }) {
    return (
        <>
            <LogoCard />
            <Form />
        </>
        // <div>
        //     <div className="w-16 mx-auto mb-6">
        //         <img src={Logo} alt="" />
        //     </div>
        //     <h1 className="title font-medium text-3xl text-center mb-3">
        //         Sign in to your account
        //     </h1>
        //     <h2 className="sub-titile text-md text-center mb-6">
        //         Or{' '}
        //         <span className="text-slate-600">
        //             you can{' '}
        //             <a href={routes.auth.signup} className="underline">
        //                 sign up by here
        //             </a>
        //         </span>
        //     </h2>
        // </div>
    );
}

function OldSignIn() {
    return (
        <div className="w-full max-w-sm mx-auto">
            {/* HEADER */}
            <div>
                <div className="w-16 mx-auto mb-6">
                    <img src={Logo} alt="" />
                </div>
                <h1 className="title font-medium text-3xl text-center mb-3">
                    Sign in to your account
                </h1>
                <h2 className="sub-titile text-md text-center mb-6">
                    Or{' '}
                    <span className="text-slate-600">
                        you can{' '}
                        <a href={routes.auth.signup} className="underline">
                            sign up by here
                        </a>
                    </span>
                </h2>
            </div>
            {/* FORM */}
            <div className="shadow-xl bg-white rounded-xl p-8">
                <form>
                    <div className="mb-3">
                        <label
                            htmlFor="email-address"
                            className="block indent-1 mb-1"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            name="emailAddress"
                            id="email-address"
                            className="w-full h-8 px-1 border-[1px] rounded-md"
                        />
                        <div id="email-error-message"></div>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="block indent-1 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full h-8 px-1 border-[1px] rounded-md"
                        />
                        <div id="password-error-message"></div>
                    </div>
                    {/* REMEMBER ME */}
                    {/* FORGOT PASSOWRD */}
                    <div className="mb-3 flow-root">
                        <a
                            href={routes.auth.forgot}
                            className="text-sm text-slate-800 float-right"
                        >
                            Forgot your password ?
                        </a>
                    </div>
                    {/* SIGN IN */}
                    <div className="mb-3 text-center">
                        <button
                            className="text-xl w-full h-9 bg-gray-700 text-white rounded-md"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(123);
                            }}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="relative flex mb-3">
                    <div className="grow translate-y-1/2 border-t-[1px] border-slate-400">
                        {' '}
                    </div>
                    <div className="whitespace-normal"> Or continue with </div>
                    <div className="grow translate-y-1/2 border-t-[1px] border-slate-400">
                        {' '}
                    </div>
                </div>
                <div className="mb-3 text-center">
                    <button className="text-xl w-full h-9 bg-gray-700 text-white rounded-md">
                        Google Sign In
                    </button>
                    <div
                        id="g_id_onload"
                        data-client_id="860287273531-n6vmem35jtadhea1tlu9hd2ed45l4c6v.apps.googleusercontent.com"
                        data-context="signin"
                        data-ux_mode="popup"
                        data-login_uri="https://api.color4.me"
                        data-auto_prompt="false"
                    ></div>

                    <div
                        className="g_id_signin"
                        data-type="standard"
                        data-shape="rectangular"
                        data-theme="outline"
                        data-text="signin_with"
                        data-size="large"
                        data-locale="en"
                        data-logo_alignment="left"
                    ></div>
                </div>
            </div>
        </div>
    );
}

const Logo = styled(Image)`
    filter: invert(30%);
`;

const Text = styled.p`
    color: rgb(71, 85, 105);
    font-size: 1.25rem;
    font-weight: 600;
    /* font-family: inherit; */
    text-align: center;
`;

function LogoCard() {
    return (
        <Card
            style={{
                margin: 'auto',
                border: 0,
            }}
            cover={
                <Logo
                    preview={false}
                    src={logo}
                    style={{
                        width: 60,
                        margin: 'auto',
                    }}
                />
            }
        >
            <Text>Sign in to your account</Text>
        </Card>
    );
}

export default SignIn;

import styled from 'styled-components'


const ContainerAvatar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    & > h1 {
        margin-left: 20px;
    }
`

const ContainerAccount = styled.div`
    display: flex;
    justify-content: space-between;

    & > div {
        width: 100%;

        & > .title {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 20px;
            & > h2 {
                margin-right: 10px;
            }
        }

        & > .upload {
            width: 100%;
            
            & > .content{
                margin: 0 auto;
                width: 70%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #D9D9D9;
                padding: 10px 5px;
                border-radius: 5px;

                & > img {
                    width: 80px;
                    border-radius: 5px;
                    display: block;
                }

                & > button {
                    margin-left: 10px;
                }
            }
        }
    }

    

`

export {
    ContainerAccount,
    ContainerAvatar,
}
import { Address, Cell, TonClient } from 'ton'
import { fromCode } from './disassembler'
import { readFileSync, writeFileSync } from 'fs'
import { compileFift, compileFunc } from 'ton-compiler'

it('should disassemble giver', async () => {
    let client = new TonClient({
        endpoint: 'https://scalable-api.tonwhales.com/jsonRPC'
    })
    let address = Address.parseFriendly('Ef-kkdY_B7p-77TLn2hUhM6QidWrrsl8FYWCIvBMpZKprKDH').address
    let state = await client.getContractState(address)
    if (!state.code) {
        console.error('code not found')
        return
    }

    let codeCell = Cell.fromBoc(state.code)[0]
    
    // console.log(fromCode(codeCell))
})


it('should disassemble config', async () => {
    let client = new TonClient({
        endpoint: 'https://scalable-api.tonwhales.com/jsonRPC'
    })
    let address = Address.parseFriendly('Ef9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbxn').address
    let state = await client.getContractState(address)
    if (!state.code) {
        console.error('code not found')
        return
    }

    let codeCell = Cell.fromBoc(state.code)[0]

    // console.log(fromCode(codeCell))
})

it('should disassemble mint', async () => {
    let client = new TonClient({
        endpoint: 'https://testnet.tonhubapi.com/jsonRPC'
    })
    let address = Address.parseFriendly('kQCz5AuHThREIDWANfcHpwbWc_g9rblW3qP__0_klue5v2Ay').address
    let state = await client.getContractState(address)
    if (!state.code) {
        console.error('code not found')
        return
    }

    let codeCell = Cell.fromBoc(state.code)[0]
    
    // console.log(fromCode(codeCell))
})

it('should disassemble nft', async () => {
    let client = new TonClient({
        endpoint: 'https://mainnet.tonhubapi.com/jsonRPC'
    })
    let address = Address.parseFriendly('EQBmG4YwsdGsUHG46rL-_GtGxsUrdmn-8Tau1DKkzQMNsGaW').address
    let state = await client.getContractState(address)
    if (!state.code) {
        console.error('code not found')
        return
    }

    let codeCell = Cell.fromBoc(state.code)[0]
    
    // console.log(fromCode(codeCell))
})

it('should dump method', async () => {
    let fiftCode = await compileFunc(`
        () main() {

        }

        () owner() method_id {

        }
    `)
    let code = await compileFift(fiftCode);
    let codeCell = Cell.fromBoc(code)[0]

    console.log(fromCode(codeCell))
})
import { 
  Cell,
  Slice, 
  Address, 
  Builder, 
  beginCell, 
  ComputeError, 
  TupleItem, 
  TupleReader, 
  Dictionary, 
  contractAddress, 
  ContractProvider, 
  Sender, 
  Contract, 
  ContractABI, 
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
}

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.code);
      b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
      },
      parse: (src) => {
          return loadStateInit(src.loadRef().beginParse());
      }
  }
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
}

export function storeContext(src: Context) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounced);
      b_0.storeAddress(src.sender);
      b_0.storeInt(src.value, 257);
      b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeContext(src)).endCell());
      },
      parse: (src) => {
          return loadContext(src.loadRef().beginParse());
      }
  }
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounce);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.value, 257);
      b_0.storeInt(src.mode, 257);
      if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
      if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
      if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
      },
      parse: (src) => {
          return loadSendParameters(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  queryId: bigint;
  newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2174598809, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwner(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  queryId: bigint;
  newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(846932810, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwnerOk(src.loadRef().beginParse());
      }
  }
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
}

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2490013878, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadDeploy(src.loadRef().beginParse());
      }
  }
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2952335191, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
      },
      parse: (src) => {
          return loadDeployOk(src.loadRef().beginParse());
      }
  }
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1829761339, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadFactoryDeploy(src.loadRef().beginParse());
      }
  }
}

export type TokenTransfer = {
  $$type: 'TokenTransfer';
  queryId: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(260734629, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.destination);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransfer(src.loadRef().beginParse());
      }
  }
}

export type TokenTransferInternal = {
  $$type: 'TokenTransferInternal';
  queryId: bigint;
  amount: bigint;
  from: Address;
  response_destination: Address;
  forward_ton_amount: bigint;
  forward_payload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(395134233, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.from);
      b_0.storeAddress(src.response_destination);
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransferInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _response_destination = source.readAddress();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeAddress(source.response_destination);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransferInternal(src.loadRef().beginParse());
      }
  }
}

export type TokenNotification = {
  $$type: 'TokenNotification';
  queryId: bigint;
  amount: bigint;
  from: Address;
  forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1935855772, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.from);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _forward_payload = source.readCell();
  return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
      },
      parse: (src) => {
          return loadTokenNotification(src.loadRef().beginParse());
      }
  }
}

export type TokenBurn = {
  $$type: 'TokenBurn';
  queryId: bigint;
  amount: bigint;
  owner: Address;
  response_destination: Address;
}

export function storeTokenBurn(src: TokenBurn) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1499400124, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.response_destination);
  };
}

export function loadTokenBurn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _owner = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurn(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _owner = source.readAddress();
  let _response_destination = source.readAddress();
  return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurn(source: TokenBurn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
      },
      parse: (src) => {
          return loadTokenBurn(src.loadRef().beginParse());
      }
  }
}

export type TokenBurnNotification = {
  $$type: 'TokenBurnNotification';
  queryId: bigint;
  amount: bigint;
  owner: Address;
  response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2078119902, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.response_destination);
  };
}

export function loadTokenBurnNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _owner = sc_0.loadAddress();
  let _response_destination = sc_0.loadMaybeAddress();
  return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _owner = source.readAddress();
  let _response_destination = source.readAddressOpt();
  return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
      },
      parse: (src) => {
          return loadTokenBurnNotification(src.loadRef().beginParse());
      }
  }
}

export type TokenExcesses = {
  $$type: 'TokenExcesses';
  queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3576854235, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadTokenExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
      },
      parse: (src) => {
          return loadTokenExcesses(src.loadRef().beginParse());
      }
  }
}

export type TokenUpdateContent = {
  $$type: 'TokenUpdateContent';
  content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2937889386, 32);
      b_0.storeRef(src.content);
  };
}

export function loadTokenUpdateContent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
  let _content = sc_0.loadRef();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
  let _content = source.readCell();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
  let builder = new TupleBuilder();
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
      },
      parse: (src) => {
          return loadTokenUpdateContent(src.loadRef().beginParse());
      }
  }
}

export type TokenTransferByPool = {
  $$type: 'TokenTransferByPool';
  queryId: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
}

export function storeTokenTransferByPool(src: TokenTransferByPool) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1744530197, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.destination);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransferByPool(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1744530197) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return { $$type: 'TokenTransferByPool' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferByPool(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return { $$type: 'TokenTransferByPool' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferByPool(source: TokenTransferByPool) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransferByPool(): DictionaryValue<TokenTransferByPool> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransferByPool(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransferByPool(src.loadRef().beginParse());
      }
  }
}

export type CheckAndTransferAToken = {
  $$type: 'CheckAndTransferAToken';
  asset: Address;
  from: Address;
  queryId: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
}

export function storeCheckAndTransferAToken(src: CheckAndTransferAToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2668664894, 32);
      b_0.storeAddress(src.asset);
      b_0.storeAddress(src.from);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.destination);
      let b_1 = new Builder();
      b_1.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_1.storeBit(true).storeRef(src.custom_payload); } else { b_1.storeBit(false); }
      b_1.storeCoins(src.forward_ton_amount);
      b_1.storeBuilder(src.forward_payload.asBuilder());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadCheckAndTransferAToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2668664894) { throw Error('Invalid prefix'); }
  let _asset = sc_0.loadAddress();
  let _from = sc_0.loadAddress();
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _response_destination = sc_1.loadAddress();
  let _custom_payload = sc_1.loadBit() ? sc_1.loadRef() : null;
  let _forward_ton_amount = sc_1.loadCoins();
  let _forward_payload = sc_1.asCell();
  return { $$type: 'CheckAndTransferAToken' as const, asset: _asset, from: _from, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleCheckAndTransferAToken(source: TupleReader) {
  let _asset = source.readAddress();
  let _from = source.readAddress();
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return { $$type: 'CheckAndTransferAToken' as const, asset: _asset, from: _from, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleCheckAndTransferAToken(source: CheckAndTransferAToken) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.asset);
  builder.writeAddress(source.from);
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserCheckAndTransferAToken(): DictionaryValue<CheckAndTransferAToken> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeCheckAndTransferAToken(src)).endCell());
      },
      parse: (src) => {
          return loadCheckAndTransferAToken(src.loadRef().beginParse());
      }
  }
}

export type Mint = {
  $$type: 'Mint';
  queryId: bigint;
  amount: bigint;
  receiver: Address;
}

export function storeMint(src: Mint) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(614915518, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeInt(src.amount, 257);
      b_0.storeAddress(src.receiver);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 614915518) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadIntBig(257);
  let _receiver = sc_0.loadAddress();
  return { $$type: 'Mint' as const, queryId: _queryId, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _receiver = source.readAddress();
  return { $$type: 'Mint' as const, queryId: _queryId, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.receiver);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeMint(src)).endCell());
      },
      parse: (src) => {
          return loadMint(src.loadRef().beginParse());
      }
  }
}

export type JettonWalletData = {
  $$type: 'JettonWalletData';
  balance: bigint;
  owner: Address;
  master: Address;
  walletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.balance, 257);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.master);
      b_0.storeRef(src.walletCode);
  };
}

export function loadJettonWalletData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadIntBig(257);
  let _owner = sc_0.loadAddress();
  let _master = sc_0.loadAddress();
  let _walletCode = sc_0.loadRef();
  return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _owner = source.readAddress();
  let _master = source.readAddress();
  let _walletCode = source.readCell();
  return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.master);
  builder.writeCell(source.walletCode);
  return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
      },
      parse: (src) => {
          return loadJettonWalletData(src.loadRef().beginParse());
      }
  }
}

export type JettonData = {
  $$type: 'JettonData';
  totalSupply: bigint;
  mintable: boolean;
  owner: Address;
  content: Cell;
  walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.totalSupply, 257);
      b_0.storeBit(src.mintable);
      b_0.storeAddress(src.owner);
      b_0.storeRef(src.content);
      b_0.storeRef(src.walletCode);
  };
}

export function loadJettonData(slice: Slice) {
  let sc_0 = slice;
  let _totalSupply = sc_0.loadIntBig(257);
  let _mintable = sc_0.loadBit();
  let _owner = sc_0.loadAddress();
  let _content = sc_0.loadRef();
  let _walletCode = sc_0.loadRef();
  return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
  let _totalSupply = source.readBigNumber();
  let _mintable = source.readBoolean();
  let _owner = source.readAddress();
  let _content = source.readCell();
  let _walletCode = source.readCell();
  return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.totalSupply);
  builder.writeBoolean(source.mintable);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
  builder.writeCell(source.walletCode);
  return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
      },
      parse: (src) => {
          return loadJettonData(src.loadRef().beginParse());
      }
  }
}

type SampleJetton_init_args = {
  $$type: 'SampleJetton_init_args';
  owner: Address;
  content: Cell;
  max_supply: bigint;
}

function initSampleJetton_init_args(src: SampleJetton_init_args) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.owner);
      b_0.storeRef(src.content);
      b_0.storeInt(src.max_supply, 257);
  };
}

async function SampleJetton_init(owner: Address, content: Cell, max_supply: bigint) {
  const __code = Cell.fromBase64('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');
  const __system = Cell.fromBase64('te6cckECRAEADT8AAQHAAQIBIAIhAQW9XCwDART/APSkE/S88sgLBAIBYgUQAurQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCyPhDAcx/AcoAVUBQVPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFswSygAB+gLJ7VQZBgT2AZIwf+BwIddJwh+VMCDXCx/eIIIQJKbdvrqOwzDTHwGCECSm3b668uCB0z+BAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTMoFI7CTy9CXbPH/gIIIQrxyiarrjAiCCEHvdl9664wKCEJRqmLa6BwkLDgP0gRryU4KgJbvy9FFxoFVB2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwcIBAIvgoIcjJ0BA1EE8QIwIREALIVVDbPMlGUBBLEDpAuhBGEEUcKggBCNs8QDQyATYw0x8BghCvHKJquvLggdQBMVVA2zwyEDRDAH8KABL4QlJAxwXy4IQByDDTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBQMAoQQWBBHEDZId9s8UEehJW6zjqgFIG7y0IBwcIBCB8gBghDVMnbbWMsfyz/JEDRBMBcQJBAjbW3bPBAjkjQ04kQTAn8NMgG0+EFvJBAjXwNVUNs8AYERTQJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBfHBRby9FUDHAFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAPATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDICASAREwIRviju2ebZ42KMGRIAAiMCASAUHgIBIBUdAgFYFhgCTa28kGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eKoJtnjYowBkXAYbbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIHAIRrxbtnm2eNirAGRsB4O1E0NQB+GPSAAGOK/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHU0gD6AFVAbBXg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdSBAQHXAFUgA9FY2zwaAApwVSB/AQEW+CjbPDBUZTBUZmAcAQ74Q/goWNs8OADdt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQThhMiKTJr7fJFy9sM7TqukCwTggZzq084r86ShYDrC3EyPZQAgFIHyAAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtYnhHRXo4QkZwWmlMcW5rSG84cG9OdmlHQzRBcVJLNXFiZktzR3Z3a3IxN26CABBb7FfCIBFP8A9KQT9LzyyAsjAgFiJDUDetAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUS2zzy4II+JTQC7gGOW4Ag1yFwIddJwh+VMCDXCx/eIIIQF41FGbqOGjDTHwGCEBeNRRm68uCB0z/6AFlsEjEToAJ/4IIQe92X3rqOGdMfAYIQe92X3rry4IHTP/oAWWwSMROgAn/gMH/gcCHXScIflTAg1wsf3iCCEA+KfqW64wIgJisCEDDbPGwX2zx/JygAxtMfAYIQD4p+pbry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAAZHUkm0B4voAUWYWFRRDMASKMvhBbySBEU1Tw8cF8vRUcyEj2zxEMFJE2zygggnJw4ABoIEQPwGCCJiWgLYIErzy9FGEoYIA9fwhwv/y9PhDVCB12zxcMDA4KQLCcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhQdnCAQHAsSBNQ58hVUNs8yRBWXiIQOQIQNhA1EDTbPCoyAKqCEBeNRRlQB8sfFcs/UAP6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCAc8WA+yCEBeNRRm6jwgw2zxsFts8f+CCEFlfB7y6jtjTHwGCEFlfB7y68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBRDMGwU2zx/4DBwLC0vALLTHwGCEBeNRRm68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAT2+EFvJFOixwWzjtP4Q1O42zwBggCm1AJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFJAxwXy9N5RyKCCAPX8IcL/8vRAuivbPBA0S83bPFGjoVAKOEEwLgL2oSLCAI7Kc3AoSBNQdMhVMIIQc2LQnFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WySdGFFBVFEMwbW3bPAGUEDVsQeIhbrOOm3ADyAGCENUydttYyx/LP8lBMHIQJEMAbW3bPJJfA+IBMjICelv4QW8kgRFNU4PHBfL0UYShggD1/CHC//L0QzBSOds8ggCpngGCCTEtAKCCCJiWgKASvPL0cIBAA39UM2YwMQBkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAB0shVMIIQe92X3lAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiySREFFAzFEMwbW3bPDIByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAMwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzACmyPhDAcx/AcoAVSBQI4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQCASA2OQIRv9gW2ebZ42GkPjcBGPhDUxLbPDBUYzBSMDgA2gLQ9AQwbQGCANivAYAQ9A9vofLghwGCANivIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskCASA6OwC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwndHgA+WzYDyfyDqyWayiE4AgFIPEMCA3igPUICE7kts8VQLbPGwxg+QQHA7UTQ1AH4Y9IAAY5IgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT4Pgo1wsKgwm68uCJPwGK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8QAAEcAIALPgnbxAhoYIImJaAZrYIoYIImJaAoKEAD7vu1E0NIAAYAHWybuNDVpcGZzOi8vUW1YNlNzRDR2bnFwQTczU0JVYlhUaTh4bzhNNU16YWl2NFl3Z3RHU2FRRmVWboIMUAnwk=');
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initSampleJetton_init_args({ $$type: 'SampleJetton_init_args', owner, content, max_supply })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const SampleJetton_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  4159: { message: `Invalid value!!` },
  4429: { message: `Invalid sender` },
  6898: { message: `The total supply will be overlapping.` },
  18668: { message: `Can't Mint Anymore` },
  42708: { message: `Invalid sender!` },
  43422: { message: `Invalid value - Burn` },
  62972: { message: `Invalid balance` },
}

const SampleJetton_types: ABIType[] = [
  {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
  {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"TokenTransferByPool","header":1744530197,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"CheckAndTransferAToken","header":2668664894,"fields":[{"name":"asset","type":{"kind":"simple","type":"address","optional":false}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"Mint","header":614915518,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
]

const SampleJetton_getters: ABIGetter[] = [
  {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
  {"name":"get_wallet_address","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SampleJetton_receivers: ABIReceiver[] = [
  {"receiver":"internal","message":{"kind":"typed","type":"Mint"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TokenUpdateContent"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TokenBurnNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SampleJetton implements Contract {
  
  static async init(owner: Address, content: Cell, max_supply: bigint) {
      return await SampleJetton_init(owner, content, max_supply);
  }
  
  static async fromInit(owner: Address, content: Cell, max_supply: bigint) {
      const init = await SampleJetton_init(owner, content, max_supply);
      const address = contractAddress(0, init);
      return new SampleJetton(address, init);
  }
  
  static fromAddress(address: Address) {
      return new SampleJetton(address);
  }
  
  readonly address: Address; 
  readonly init?: { code: Cell, data: Cell };
  readonly abi: ContractABI = {
      types:  SampleJetton_types,
      getters: SampleJetton_getters,
      receivers: SampleJetton_receivers,
      errors: SampleJetton_errors,
  };
  
  private constructor(address: Address, init?: { code: Cell, data: Cell }) {
      this.address = address;
      this.init = init;
  }
  
  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Mint | TokenUpdateContent | TokenBurnNotification | Deploy) {
      
      let body: Cell | null = null;
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
          body = beginCell().store(storeMint(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenUpdateContent') {
          body = beginCell().store(storeTokenUpdateContent(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenBurnNotification') {
          body = beginCell().store(storeTokenBurnNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
          body = beginCell().store(storeDeploy(message)).endCell();
      }
      if (body === null) { throw new Error('Invalid message type'); }
      
      await provider.internal(via, { ...args, body: body });
      
  }
  
  async getGetJettonData(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_jetton_data', builder.build())).stack;
      const result = loadTupleJettonData(source);
      return result;
  }
  
  async getGetWalletAddress(provider: ContractProvider, owner: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(owner);
      let source = (await provider.get('get_wallet_address', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getOwner(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('owner', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
}
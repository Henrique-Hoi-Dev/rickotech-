import produce from 'immer';

const INITIAL_STATE = {
  financialBoxList: [],
  card: [],
  form: {
    close_caixa: '',
    value_open: '',
    open_caixa: '',
  }
};

export default function financialBox(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@financialBox/RESET_FORM': {
        draft.form = {
          value_open: '',
          open_caixa: '',
        };
        break;
      }
      case '@financialBox/GET_BYID_FINANCIALBOX_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@financialBox/GET_CARD_SUCCESS': {
        draft.card = action.payload.data;
        break;
      }
      case '@financialBox/FIND_ALL_FINANCIALBOX_SUCCESS': {
        draft.financialBoxList = action.payload.data;
        break;
      }
      default:
    }
  });
}

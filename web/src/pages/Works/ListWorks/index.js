import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as moment from 'moment';

import { Container } from './styles';
import { FcEmptyTrash } from 'react-icons/fc';

import Header from '../../../components/HeaderListAndRegister';
import Footer from '~/components/Footer';

import { findAllServiceRequest, 
          deleteServiceRequest } from '../../../store/modules/servicos/actions';

const ListSales = ({ servicoList, handlerRemoveService }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllServiceRequest());
    }
    onLoad();
  }, [dispatch]);

  //formatção do preço do produto
  function currencyFormat(num) {
    if (num) {
      return (
        'R$' +
        parseFloat(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    }
  }

  return (
    <Container>
      <Header  title="Todos os serviços"/>
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Tipo de serviço</td>
                <td>Valor serviço</td>
                <td>Data do serviço</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(servicoList).map((servico, i) => (
                <tr key={i} value={servico.id}>
                  <td>{servico.name}</td>
                  <td>{currencyFormat(servico.price)}</td>
                  <td>{moment(servico.date_service).format('DD/MM/YYYY')}</td>
                  <td>
                    <button onClick={(e) => handlerRemoveService(e, servico.id)}>
                      <FcEmptyTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      <Footer />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    servicoList: state.servicos.servicoList.responseData ? state.servicos.servicoList.responseData : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlerRemoveService: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja desfazer essa serviço?'
      );
      if (confirm) {
        dispatch(deleteServiceRequest(id));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSales);

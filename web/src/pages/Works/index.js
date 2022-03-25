import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';

import { useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import Header from '~/components/HeaderListAndRegister';
import * as moment from 'moment';

import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createServicetRequest,
  getByIdServiceRequest,
  resetFormulario } from '~/store/modules/servicos/actions';
  
const RegistreServices = ({ financialBoxList }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { form } = useSelector((state) => state.servicos);

  useEffect(() => {
    if (id) {
      dispatch(getByIdServiceRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
      dispatch(createServicetRequest(values));

      handleReset(resetForm);
  };
  
  const handleReset = (resetForm) => {
    resetForm({});
  };

  return (
    <Container>
      <Header title="Registro de Serviços"/>
      <div className="header-main">
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={form} >
            <Form className="form-input">
              <div id="container-input" className="header-title">
                <div className="campo2">
                  <label htmlFor="name">Nome do Serviço</label>
                  <Field  name="name" />

                  <label htmlFor="valor">Valor</label>
                  <Field type="number" name="price" />
                </div>

                <div className="campo" >
                  <label htmlFor="id">Caixa</label>
                  <Field  component="select" name="financial_id" >
                    <option value="0">Selecione um caixa</option>
                    {[].concat(financialBoxList[0]).map((caixa, i) => (
                      <option key={i} value={caixa.id} >
                      {moment(caixa.open_caixa).format('DD/MM/YYYY')} - 
                      {(caixa.status === false && 'Aberto')}
                      </option>
                    ))}    
                  </Field>   
                  <label htmlFor="data_serviço">Dia do serviço feito</label>
                  <Field name="date_service" type="date" />
                </div> 

                <footer className="buttons-container">
                    <p>
                      <FcHighPriority />
                      Preencha todos os dados!
                    </p>
                  <button type="submit">Salvar</button>
                </footer>
              </div>
            </Form>
        </Formik>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxList.responseData ? state.financialBox.financialBoxList.responseData : [],
  };
};

export default connect(mapStateToProps) (RegistreServices)
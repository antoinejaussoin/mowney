import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import CategoryPicker from 'modules/categories/components/category-picker';
import NewClue from 'modules/categories/new-clue';
import { selectIsOpen, selectCategory } from './selectors';
import { closeModal, changeCategory, assignCategory, createClue } from './state';
import styles from './index.scss';

const CategoriseModal = ({ open, category, onCloseModal, onChangeCategory, onAssignCategory, onCreateClue }) => (
  <Dialog
    active={open}
    onEscKeyDown={onCloseModal}
    onOverlayClick={onCloseModal}
    title="Categorise Transactions"
  >
    <div className={styles.category}>
      <CategoryPicker value={category} onChange={onChangeCategory} />
      <Button label="Assign" onClick={onAssignCategory} disabled={!category} primary raised />
    </div>
    <h3>or</h3>
    <div className={styles.clue}>
      <NewClue canCreate={!!category} onSubmit={onCreateClue} />
    </div>
  </Dialog>
);

CategoriseModal.propTypes = {
  open: PropTypes.bool,
  category: PropTypes.number,
  onCloseModal: PropTypes.func,
  onChangeCategory: PropTypes.func,
  onAssignCategory: PropTypes.func,
  onCreateClue: PropTypes.func
};

const mapStateToProps = (state) => ({
  open: selectIsOpen(state),
  category: selectCategory(state)
});

const mapActionsToProps = (dispatch, { accountId }) => ({
  onCloseModal: () => dispatch(closeModal()),
  onChangeCategory: (id) => dispatch(changeCategory(id)),
  onAssignCategory: () => dispatch(assignCategory()),
  onCreateClue: (values) => dispatch(createClue({ ...values, accountId }))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(CategoriseModal);

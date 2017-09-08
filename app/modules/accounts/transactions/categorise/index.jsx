import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import CategoryPicker from 'modules/categories/components/category-picker';
import { selectIsOpen, selectCategory } from './selectors';
import { closeModal, changeCategory, assignCategory } from './state';
import styles from './index.scss';

const CategoriseModal = ({ open, category, onCloseModal, onChangeCategory, onAssignCategory }) => (
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
  </Dialog>
);

CategoriseModal.propTypes = {
  open: PropTypes.bool,
  category: PropTypes.number,
  onCloseModal: PropTypes.func,
  onChangeCategory: PropTypes.func,
  onAssignCategory: PropTypes.func
};

const mapStateToProps = (state) => ({
  open: selectIsOpen(state),
  category: selectCategory(state)
});

const mapActionsToProps = (dispatch) => ({
  onCloseModal: () => dispatch(closeModal()),
  onChangeCategory: (id) => dispatch(changeCategory(id)),
  onAssignCategory: () => dispatch(assignCategory())
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(CategoriseModal);

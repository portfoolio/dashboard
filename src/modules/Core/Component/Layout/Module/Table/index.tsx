import React, { Component, Fragment, ReactNode } from 'react';
import {
  TableRowDataDefinition,
  TableHeadDefinition,
  TableRow,
  TableCell,
} from 'modules/Core/Component/Layout/Module/Table/types';
import { withRouter } from 'react-router-dom';
import EditIcon from '@atlaskit/icon/glyph/edit';
import RemoveIcon from '@atlaskit/icon/glyph/trash';
import AddIcon from '@atlaskit/icon/glyph/add';
import DynamicTable from '@atlaskit/dynamic-table';
import Button from '@atlaskit/button';
import styled from 'styled-components';
import _ from 'lodash';
import RemoveModal from 'modules/Core/Component/Modal/RemoveModal';

export const ButtonWrapper = styled.div`
  float: right;
  font-size: 14px;
  display: inline-block;
`;

const TableTopWrapper = styled.div`
  margin: 0 0 25px 0;
`;

const StyledButtonWrapper = styled.div`
    display: inline-block;
    padding: 10px;
    margin-left: -10px;
    font-size: 14px;
`;

class Table extends Component<any, any> {
  static defaultProps = {
    showTableTop: [1, 2],
    rowsPerPage: 10,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isModalOpen: false,
      removalId: '',
    };

    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  removeCellItem() {
    this.props.onDeleteConfirmed(this.state.removalId);
    this.hideModal();
  }

  hideModal() {
    this.setState({
      isModalOpen: false,
      removalId: '',
    });
  }

  openModal(id: string) {
    this.setState({
      isModalOpen: true,
      removalId: id,
    });
  }

  transformHead(head: TableHeadDefinition): TableHeadDefinition {
    if (!this.props.showActions) {
      return head;
    }

    const { cells } = head;

    return {
      ...head,
      cells: [
        ...cells,
        {
          key: 'more',
          content: 'Action',
          shouldTruncate: true,
          width: 10,
        },
      ],
    };
  }

  transformRows(head: TableHeadDefinition, rows: TableRowDataDefinition[]): TableRow[] {
    let counter = 0;
    const allowedKeys = _.map(this.props.head.cells, 'key');

    return rows.map((data: TableRowDataDefinition): TableRow => {
      const id: string = data.id;
      let cells: TableCell[] = [];

      for (let key in data) {
        if (!allowedKeys.includes(key)) {
          continue;
        }

        let content = this.props.dataTransformation !== undefined
          && this.props.dataTransformation.hasOwnProperty(key)
            ? this.props.dataTransformation[key](data)
            : data[key];

        if (key === 'id') {
          content = `${counter++}`;
        }

        cells.push({
          key,
          content,
        });
      }

      let orderedCells: TableCell[] = [];
      // @ts-ignore
      head.cells.map(({ key }) => orderedCells.push(_.find(cells, ['key', key])));

      if (this.props.showActions) {
        orderedCells.push({
          key: 'actions',
          content: (
              <Fragment>
                <StyledButtonWrapper>
                  <Button
                    appearance='default'
                    iconBefore={<EditIcon label='Edit Item' size='small' />}
                    onClick={() => this.props.history.push(this.props.modificationRoute(id))}
                  />
                </StyledButtonWrapper>

              <StyledButtonWrapper>
                  <Button
                    appearance='danger'
                    iconBefore={<RemoveIcon label='Remove Item' size='small' />}
                    onClick={() => this.openModal(id)}
                  />
              </StyledButtonWrapper>
              </Fragment>
          ),
        });
      }

      return {
        id,
        cells: orderedCells,
      };
    });
  }

  render(): ReactNode {
    return (
      <Fragment>
        <RemoveModal
          isOpen={this.state.isModalOpen}
          hide={() => this.hideModal()}
          onRemove={() => this.removeCellItem()}
        />
        <DynamicTable
          caption={
            <Fragment>
              {
                _.isEmpty(this.props.showTableTop) ? (<></>) : <TableTopWrapper>
                  {this.props.title}
                  <ButtonWrapper>
                    <Button
                      appearance='primary'
                      iconBefore={<AddIcon label='Add Item' size='small' />}
                      onClick={() => this.props.history.push(this.props.creationRoute)}
                    >
                      Create
                    </Button>
                  </ButtonWrapper>
                </TableTopWrapper>
              }
            </Fragment>
          }
          head={this.transformHead(this.props.head)}
          rows={this.transformRows(this.props.head, this.props.data)}
          rowsPerPage={
            _.isArray(this.props.rowsPerPage)
            && this.props.rowsPerPage.length === 0 ? undefined : this.props.rowsPerPage
          }
          defaultPage={this.props.defaultPage || 1}
          loadingSpinnerSize='large'
          isRankable={true}
          isRankingDisabled={false}
          onRankStart={(params: any) => console.log('onRankStart', params)}
          onRankEnd={(params: any) => console.log('onRankEnd', params)}
          isLoading={this.props.data.length < 0}
          isFixedSize
          sortKey={'id'}
          defaultSortKey={'id'}
          defaultSortOrder='ASC'
          onSort={() => console.log('onSort')}
          onSetPage={() => console.log('onSetPage')}
        />
      </Fragment>
    );
  }
}

export default withRouter(Table);

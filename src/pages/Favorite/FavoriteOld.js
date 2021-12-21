/* eslint-disable */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditRounded, RemoveRounded } from '@material-ui/icons';
import BottomDrawer from 'components/BottomDrawer';
// import { getFavoriteList } from 'apis/favoriteApi';
import BlockEmpty from 'assets/images/favoriteBlock/blockEmpty.png';
import Favorite1 from './favorite_1';
import Favorite2 from './favorite_2';
import { setFavoriteDrawer, setFavoriteList, setCustomFavoriteList } from './stores/actions';
import { blockBackgroundGenerator, iconGenerator } from './favoriteGenerator';
import FavoriteDrawerWrapper from './favorite.style';
import { mockFavoriteList } from './mockData';

const Favorite = () => {
  const [pressTimer, setPressTimer] = useState(0);
  const [blockOrder, setBlockOrder] = useState(0);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const favoriteDrawer = useSelector(({ favorite }) => favorite.favoriteDrawer);
  const favoriteList = useSelector(({ favorite }) => favorite.favoriteList);
  const customFavoriteList = useSelector(({ favorite }) => favorite.customFavoriteList);
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    setShowRemoveButton(false);
    dispatch(setFavoriteDrawer({ ...favoriteDrawer, open: false }));
  };

  const handleOpenView = (viewName, order) => {
    setBlockOrder(order);
    dispatch(setFavoriteDrawer({
      ...favoriteDrawer,
      title: viewName === 'add' ? '新增我的最愛' : '編輯我的最愛',
      content: viewName,
      back: () => {
        dispatch(setFavoriteDrawer({
          ...favoriteDrawer,
          title: '我的最愛',
          content: '',
          back: null,
        }));
      },
    }));
    setShowRemoveButton(false);
  };

  const handleClickRemoveBlock = (event) => {
    // const blockId = event.currentTarget.parentElement.getAttribute('data-id');
    const blockId = event.currentTarget.parentElement.getAttribute('data-rbd-draggable-id');

    // update favoriteList
    const filteredFavoriteList = favoriteList;
    filteredFavoriteList.forEach((group) => group.blocks.forEach((item) => {
      if (item.id === blockId) {
        item.selected = !item.selected;
        item.selectedOrder = null;
      }
    }));
    dispatch(setFavoriteList(filteredFavoriteList));

    // update customFavoriteList
    const filteredCustomFavoriteList = customFavoriteList.filter((block) => block.id !== blockId);
    dispatch(setCustomFavoriteList(filteredCustomFavoriteList));
  };

  // 長按編輯
  const handleEditBlock = () => setShowRemoveButton(true);
  const handleTouchStart = () => setPressTimer(setTimeout(handleEditBlock, 800));
  const handleTouchEnd = () => pressTimer && clearTimeout(pressTimer);

  // 若為 string 則 render 空區塊，若非 string 則 render 已選的最愛功能項目
  const renderBlockElement = (blocks) => blocks.map((block, index) => (
    typeof block === 'string'
      ? (
        <Draggable key={index + 1} draggableId={block + (index + 1)} index={index + 1}>
          { (provided) => (
            <button
              type="button"
              // key={index + 1}
              onClick={() => handleOpenView('add', index + 1)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <img src={block} alt="empty" />
            </button>
          ) }
        </Draggable>
      )
      : (
        <Draggable key={block.id} draggableId={block.id} index={index + 1}>
          { (provided) => (
            <button
              type="button"
              // key={block.id}
              data-id={block.id}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              { showRemoveButton && <span className="removeButton" onClick={handleClickRemoveBlock}><RemoveRounded /></span> }
              {/* 最愛項目總數為 12，前 2 項為預設存在 (不可編輯)，背景由 index + 3 開始渲染 */}
              <img src={blockBackgroundGenerator(index + 3)} alt="block" />
              <span className="icon">
                {iconGenerator(block.id)}
              </span>
              {block.label}
            </button>
          ) }
        </Draggable>
      )
  ));

  // 排列已選的最愛功能項目，空欄位補上空白區塊
  const renderBlocks = () => {
    const blocks = [];
    customFavoriteList.forEach((block) => {
      blocks[block.selectedOrder - 1] = block;
    });
    for (let i = 0; i < 10; i++) {
      if (!blocks[i]) blocks[i] = BlockEmpty;
    }
    return renderBlockElement(blocks);
  };

  // 預設的彈窗頁面 - 已設置的最愛項目
  // const defaultContent = () => (
  //   <div className="defaultPage">
  //     <button type="button" className="editButton" onClick={() => handleOpenView('edit')}>
  //       編輯
  //       <EditRounded />
  //     </button>
  //
  //     <DragDropContext>
  //       <Droppable droppableId="favCards">
  //         <div className="favoriteArea">
  //           <button type="button" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
  //             <img src={blockBackgroundGenerator(1)} alt="block" />
  //             <span className="icon">{iconGenerator('share')}</span>
  //             推薦碼分享
  //           </button>
  //           <button type="button" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
  //             <img src={blockBackgroundGenerator(2)} alt="block" />
  //             <span className="icon">{iconGenerator('gift')}</span>
  //             優惠
  //           </button>
  //           { renderBlocks() }
  //         </div>
  //       </Droppable>
  //     </DragDropContext>
  //   </div>

  // 預設的彈窗頁面 - 已設置的最愛項目
  const defaultContent = () => (
    <div className="defaultPage">
      <button type="button" className="editButton" onClick={() => handleOpenView('edit')}>
        編輯
        <EditRounded />
      </button>
      <DragDropContext onDragStart={() => console.log('drag start')}>
        <Droppable droppableId="favCards">
          { (provided) => (
            <div className="favoriteArea" {...provided.droppableProps} ref={provided.innerRef}>
              <button type="button" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img src={blockBackgroundGenerator(1)} alt="block" />
                <span className="icon">{iconGenerator('share')}</span>
                推薦碼分享
              </button>
              <button type="button" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img src={blockBackgroundGenerator(2)} alt="block" />
                <span className="icon">{iconGenerator('gift')}</span>
                優惠
              </button>
              { renderBlocks() }
              { provided.placeholder }
            </div>
          ) }
        </Droppable>
      </DragDropContext>
    </div>
  );

  const drawerController = (content) => {
    switch (content) {
      case 'add':
        return <Favorite1 blockOrder={blockOrder} />;
      case 'edit':
        return <Favorite2 />;
      default:
        return defaultContent();
    }
  };

  useEffect(() => {
    // getFavoriteList().then((response) => dispatch(setFavoriteList(response.favoriteList)));
    dispatch(setFavoriteList(mockFavoriteList.favoriteList));
  }, []);

  useEffect(() => {
    const customList = [];
    favoriteList?.forEach((group) => group.blocks.forEach((item) => item.selected && customList.push(item)));
    dispatch(setCustomFavoriteList(customList));
    // const selectedBlocks = favoriteList
    //   .map((group) => group.blocks.filter((block) => block.selected))
    //   .flat();
    // setSelectedFavoriteList(selectedBlocks);
  }, [favoriteList?.length]);

  return (
    <BottomDrawer
      noScrollable
      title={favoriteDrawer.title}
      isOpen={favoriteDrawer.open}
      onClose={handleCloseDrawer}
      onBack={favoriteDrawer.back}
      content={(
        <FavoriteDrawerWrapper>
          { drawerController(favoriteDrawer.content) }
        </FavoriteDrawerWrapper>
      )}
    />
  );
};

export default Favorite;
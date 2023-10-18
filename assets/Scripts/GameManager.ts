import { _decorator, CCInteger, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;
export const BLOCK_SIZE = 40; // 添加一个放大比

enum BlockType {
    BT_NONE,
    BT_STONE
};

@ccclass('GameManager')
export class GameManager extends Component {

    @property({ type: Prefab })
    public boxPrefab: Prefab | null = null
    @property({ type: CCInteger })
    public roadLength: number = 50
    private _road: BlockType[] = []

    start() {
        this.generateRoad()
    }

    update(deltaTime: number) {

    }

    generateRoad() {

        this.node.removeAllChildren();
        this._road = [];
        // startPos
        this._road.push(BlockType.BT_STONE);

        for (let i = 1; i < this.roadLength; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) {
                this._road.push(BlockType.BT_STONE);
            } else {
                this._road.push(Math.floor(Math.random() * 2));
            }
        }

        for (let j = 0; j < this._road.length; j++) {
            let block: Node | null = this.spawnBlockByType(this._road[j]);
            if (block) {
                this.node.addChild(block);
                block.setPosition(j * BLOCK_SIZE, 0, 0);
            }
        }
    }

    spawnBlockByType(type: BlockType) {
        if (!this.boxPrefab) {
            return null;
        }

        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.boxPrefab);
                break;
        }

        return block;
    }
}



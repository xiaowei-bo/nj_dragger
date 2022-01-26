<template>
    <div class="user-list">
        <Header />
        <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            label-suffix="："
            class="search-form clearfix"
            size="small"
        >
            <el-form-item label="用户ID">
                <el-input v-model="searchForm.id" placeholder="请输入用户ID" />
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="searchForm.userName" placeholder="请输入用户昵称" />
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="searchForm.userCode" placeholder="请输入登录用户名" />
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" @click="getUserList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="userList"
            class="user-list-table"
        >
            <el-table-column
                prop="id"
                label="用户ID"
                align="center"
            />
            <el-table-column
                prop="userName"
                label="用户昵称"
                align="center"
            />
            <el-table-column
                prop="userCode"
                label="用户登录名"
                align="center"
            />
            <el-table-column
                label="在线时长"
                align="center"
            >
                <template slot-scope="scope">
                    {{ handlerOnlineTime(scope.row.onlineTime) }}
                </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                align="center"
            >
                <template slot-scope="scope">
                    {{ moment(scope.row.created_at).format("YYYY/MM/DD hh:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column
                prop="updated_at"
                label="更新时间"
                align="center"
            >
                <template slot-scope="scope">
                    {{ moment(scope.row.updated_at).format("YYYY/MM/DD hh:mm:ss") }}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :current-page="searchForm.currentPage"
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="searchForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="searchForm.totalPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import moment from "moment";
import { getUserList } from "@/api/user";
export default {
    components: { Header },
    data() {
        return {
            searchForm: {
                id: "",
                userName: "",
                userCode: "",
                currentPage: 1,
                pageSize: 20,
                totalPage: 0
            },
            userList: [],
            moment
        };
    },
    methods: {
        handleCurrentChange(i) {
            this.searchForm.currentPage = i;
            this.getUserList();
        },
        handleSizeChange(i) {
            this.searchForm.pageSize = i;
            this.getActivityList();
        },
        handlerOnlineTime(_num) {
            const num = (_num || 0) / 1000;
            if (num < 60) return `${num}秒`;
            if (num >= 60 && num < 60 * 60) return `${Math.floor(num / 60)}分钟`;
            if (num >= 60 * 60 && num < 60 * 60 * 24) return `${Math.floor(num / 60 / 60)}小时`;
            if (num >= 60 * 60 * 24) return `${Math.floor(num / 60 / 60 / 24)}天`;
        },
        async getUserList() {
            const res = await getUserList(this.searchForm);
            this.userList = res.list;
            this.searchForm.totalPage = res.total;
        }
    },
    created() {
        this.getUserList();
    }
};
</script>

<style lang='scss' scoped>
.user-list{
    width: 100%;
    height: 100%;
    .user-list-table{
        padding: 40px 40px 0 40px;
    }
    .el-pagination{
        padding: 40px;
    }
    .search-form{
        padding: 40px 40px 0 40px;
        .el-form-item{
            margin-right: 30px;
        }
    }
}
</style>

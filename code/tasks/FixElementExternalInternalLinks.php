<?php
class FixElementExternalInternalLinks extends BuildTask
{

    protected $title = 'Fix ElementExternalLinks and ElementInternalLinks DB structure';

    protected $description = 'ElementExternalLinks and ElementInternalLinks have been consolidated into a single class ElementLink so this task migrates old links to new DB structure';

    public function run($request)
    {
        // widget tables
        DB::query('UPDATE "Widget" SET "ClassName" = \'ElementLink\' WHERE "ClassName" IN (\'ElementInternalLink\',\'ElementExternalLink\')');
        DB::query('UPDATE "Widget_Live" SET "ClassName" = \'ElementLink\' WHERE "ClassName" IN (\'ElementInternalLink\',\'ElementExternalLink\')');
        DB::query('UPDATE "Widget_versions" SET "ClassName" = \'ElementLink\' WHERE "ClassName" IN (\'ElementInternalLink\',\'ElementExternalLink\')');

        $tables = array(
            'ElementInternalLink' => 'ElementLink',
            'ElementInternalLink_versions' => 'ElementLink_versions',
            'ElementInternalLink_Live' => 'ElementLink_Live',
            'ElementExternalLink' => 'ElementLink',
            'ElementExternalLink_versions' => 'ElementLink_versions',
            'ElementExternalLink_Live' => 'ElementLink_Live'
        );
        foreach ($tables as $from => $to) {
            $results = DB::query('SELECT * FROM ' . $from);
            foreach ($results as $result) {
                $sql  = "INSERT IGNORE INTO " . $to;
                $sql .= ' ("'.implode('", "', array_keys($result)).'")';
                $sql .= " VALUES (";
                foreach ($result as $value) {
                    $sql .= "'".Convert::raw2sql($value) . "',";
                }
                $sql = substr($sql, 0, -1);
                $sql .= ") ";
                DB::query($sql);
            }
        }
    }
}
